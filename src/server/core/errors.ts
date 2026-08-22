/**
 * Domain error types shared by every server module.
 *
 * Server actions never throw these across the boundary — `toActionResult` in
 * ./result.ts converts them into a serializable failure. They exist so that
 * domain code can signal *why* something failed without knowing whether it is
 * being called from a form action, a route handler, or another server function.
 */

export type DomainErrorCode =
  | "unauthenticated"
  | "forbidden"
  | "not_found"
  | "validation"
  | "conflict"
  | "invariant";

export class DomainError extends Error {
  readonly code: DomainErrorCode;
  /** Field-level messages, keyed by form field name. */
  readonly fieldErrors: Record<string, string[]>;

  constructor(
    code: DomainErrorCode,
    message: string,
    fieldErrors: Record<string, string[]> = {},
  ) {
    super(message);
    this.name = "DomainError";
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

export class UnauthenticatedError extends DomainError {
  constructor(message = "You must be signed in to do that.") {
    super("unauthenticated", message);
    this.name = "UnauthenticatedError";
  }
}

export class ForbiddenError extends DomainError {
  constructor(message = "You do not have permission to do that.") {
    super("forbidden", message);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends DomainError {
  constructor(what = "Record") {
    super("not_found", `${what} not found.`);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends DomainError {
  constructor(
    message = "Please correct the highlighted fields.",
    fieldErrors: Record<string, string[]> = {},
  ) {
    super("validation", message, fieldErrors);
    this.name = "ValidationError";
  }
}

export class ConflictError extends DomainError {
  constructor(message: string) {
    super("conflict", message);
    this.name = "ConflictError";
  }
}

/**
 * A business rule was violated — e.g. approving a leave request that would
 * overdraw a balance. Distinct from ValidationError, which is about input shape.
 */
export class InvariantError extends DomainError {
  constructor(message: string) {
    super("invariant", message);
    this.name = "InvariantError";
  }
}

/** Maps a Prisma unique-constraint violation onto a readable ConflictError. */
export function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: unknown }).code === "P2002"
  );
}

export function isForeignKeyConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: unknown }).code === "P2003"
  );
}
