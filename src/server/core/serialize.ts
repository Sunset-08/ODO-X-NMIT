import type { Prisma } from "@prisma/client";

/**
 * Serialization boundary helpers.
 *
 * Every `@id` in schema.prisma is a `BigInt`, and money/day-count columns are
 * Prisma `Decimal`. Neither survives the React Server Component boundary:
 * `BigInt` has no JSON representation and throws in `JSON.stringify`, and
 * `Decimal` is a class instance rather than a plain object.
 *
 * So nothing in `src/server/**` may return raw Prisma rows to a page. Query
 * functions map rows into DTOs built from these primitives, which produce only
 * strings, numbers, booleans, `null`, and `Date` — all of which React can
 * serialize.
 *
 * Decimals become strings rather than numbers on purpose: `Decimal(14,2)` money
 * would silently lose precision through an IEEE-754 double. Format for display
 * with `formatMoney`, and use `decimalToNumber` only for values that are safe
 * as floats (day counts).
 */

/** BigInt primary/foreign key to its string form for the client. */
export function idToString(id: bigint): string {
  return id.toString();
}

export function idToStringOrNull(id: bigint | null): string | null {
  return id === null ? null : id.toString();
}

/**
 * Parses a client-supplied id back into a BigInt.
 * Returns null rather than throwing, so callers can map it to a 404.
 */
export function parseId(value: string | null | undefined): bigint | null {
  if (value === null || value === undefined) return null;
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  try {
    const parsed = BigInt(trimmed);
    // `BigInt(0)` rather than a `0n` literal: tsconfig targets ES2017, which
    // does not permit BigInt literal syntax.
    return parsed > BigInt(0) ? parsed : null;
  } catch {
    return null;
  }
}

/** Exact decimal as a string. Use for money. */
export function decimalToString(value: Prisma.Decimal): string {
  return value.toString();
}

export function decimalToStringOrNull(
  value: Prisma.Decimal | null,
): string | null {
  return value === null ? null : value.toString();
}

/**
 * Decimal as a JS number. Only for small-magnitude values where float error is
 * irrelevant — day counts (`Decimal(5,1)`) and hour totals. Never for money.
 */
export function decimalToNumber(value: Prisma.Decimal): number {
  return value.toNumber();
}

export function decimalToNumberOrNull(
  value: Prisma.Decimal | null,
): number | null {
  return value === null ? null : value.toNumber();
}

/** `@db.Date` column to a plain `YYYY-MM-DD` string, free of timezone drift. */
export function toDateString(value: Date): string {
  const year = value.getUTCFullYear();
  const month = String(value.getUTCMonth() + 1).padStart(2, "0");
  const day = String(value.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function toDateStringOrNull(value: Date | null): string | null {
  return value === null ? null : toDateString(value);
}

export function toISOStringOrNull(value: Date | null): string | null {
  return value === null ? null : value.toISOString();
}

/**
 * Last-resort deep conversion for values whose shape isn't known statically,
 * such as `ActivityLog.metadata`. Prefer an explicit DTO mapper everywhere else
 * — this loses type information.
 */
export function jsonSafe<T>(value: T): unknown {
  if (value === null || value === undefined) return value ?? null;
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map((entry) => jsonSafe(entry));

  if (typeof value === "object") {
    // Prisma.Decimal and other decimal.js instances.
    const maybeDecimal = value as { toFixed?: unknown; toString(): string };
    if (typeof maybeDecimal.toFixed === "function") {
      return maybeDecimal.toString();
    }
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        jsonSafe(entry),
      ]),
    );
  }

  return value;
}

/** Formats a decimal string for display, e.g. "90000" -> "₹90,000.00". */
export function formatMoney(amount: string, currency = "INR"): string {
  const parsed = Number(amount);
  if (!Number.isFinite(parsed)) return amount;
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(parsed);
  } catch {
    return `${currency} ${amount}`;
  }
}

/** "Alice", "Chen" -> "AC". Matches the Avatar component's `initials` prop. */
export function toInitials(firstName: string, lastName: string): string {
  const first = firstName.trim().charAt(0).toUpperCase();
  const last = lastName.trim().charAt(0).toUpperCase();
  return `${first}${last}` || "?";
}
