import { ZodError, type ZodType } from "zod";

import {
  DomainError,
  ValidationError,
  isForeignKeyConstraintError,
  isUniqueConstraintError,
  type DomainErrorCode,
} from "./errors";

/**
 * The single shape every server action returns.
 *
 * Actions resolve rather than throw, because a thrown error crossing the action
 * boundary reaches the client as an opaque "An error occurred in the Server
 * Components render" with no usable detail. Returning a discriminated union
 * lets forms render field errors inline.
 */
export type ActionResult<T = void> =
  | { ok: true; data: T }
  | {
      ok: false;
      code: DomainErrorCode | "unknown";
      message: string;
      fieldErrors: Record<string, string[]>;
    };

export function actionOk(): ActionResult<void>;
export function actionOk<T>(data: T): ActionResult<T>;
export function actionOk<T>(data?: T): ActionResult<T | void> {
  return { ok: true, data: data as T };
}

export function actionError(
  code: DomainErrorCode | "unknown",
  message: string,
  fieldErrors: Record<string, string[]> = {},
): ActionResult<never> {
  return { ok: false, code, message, fieldErrors };
}

/**
 * Wraps an action body so domain errors, Zod errors and Prisma constraint
 * violations all become an `ActionResult` failure instead of an unhandled throw.
 */
export async function runAction<T>(
  body: () => Promise<T>,
): Promise<ActionResult<T>> {
  try {
    return actionOk(await body());
  } catch (error) {
    return toActionResult(error);
  }
}

export function toActionResult(error: unknown): ActionResult<never> {
  if (error instanceof DomainError) {
    return actionError(error.code, error.message, error.fieldErrors);
  }

  if (error instanceof ZodError) {
    const flattened = flattenZodError(error);
    return actionError(
      "validation",
      "Please correct the highlighted fields.",
      flattened,
    );
  }

  if (isUniqueConstraintError(error)) {
    return actionError(
      "conflict",
      "That value is already taken. Please use a different one.",
    );
  }

  if (isForeignKeyConstraintError(error)) {
    return actionError(
      "conflict",
      "That change references a record that no longer exists.",
    );
  }

  // Log the real cause server-side; return something safe to the client rather
  // than leaking a stack trace or SQL text.
  console.error("[action] unhandled error:", error);
  return actionError("unknown", "Something went wrong. Please try again.");
}

function flattenZodError(error: ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? issue.path.join(".") : "_form";
    fieldErrors[key] ??= [];
    fieldErrors[key].push(issue.message);
  }
  return fieldErrors;
}

/**
 * Validates input inside an action, raising a ValidationError carrying
 * field-level messages that `runAction` turns into an ActionResult.
 */
export function parseInput<T>(schema: ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) {
    throw new ValidationError(
      "Please correct the highlighted fields.",
      flattenZodError(result.error),
    );
  }
  return result.data;
}

/** Reads a `FormData` into a plain object suitable for `parseInput`. */
export function formDataToObject(formData: FormData): Record<string, unknown> {
  const object: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      object[key] = value;
      continue;
    }
    const existing = object[key];
    if (existing === undefined) {
      object[key] = value;
    } else if (Array.isArray(existing)) {
      existing.push(value);
    } else {
      object[key] = [existing, value];
    }
  }
  return object;
}
