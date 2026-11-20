import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "mws_mission_3f_super_secret_jwt_key_2026";

export interface TokenPayload {
  role: "ADMIN" | "COORDINATOR" | "STUDENT";
  id: string;
  email?: string;
  schoolCode?: string;
  sessionToken?: string;
}

export function generateToken(payload: TokenPayload, expiresIn: SignOptions["expiresIn"] = "7d"): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
