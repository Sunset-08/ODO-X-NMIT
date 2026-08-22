import crypto from "node:crypto";
import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(
    password: string,
    passwordHash: string,
) {
    return bcrypt.compare(password, passwordHash);
}

export function generateToken() {
    return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("hex");
}