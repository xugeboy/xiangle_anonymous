import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "xiangley_admin_session";
const oneDaySeconds = 60 * 60 * 24;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-only-change-this-secret";
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "change-me-before-deploy"
  };
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function makeToken() {
  const payload = `${Date.now()}.${randomBytes(18).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token?: string) {
  if (!token) {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const payload = `${parts[0]}.${parts[1]}`;
  const expected = sign(payload);
  const actual = parts[2];

  if (expected.length !== actual.length) {
    return false;
  }

  const validSignature = timingSafeEqual(Buffer.from(expected), Buffer.from(actual));
  const ageMs = Date.now() - Number(parts[0]);

  return validSignature && Number.isFinite(ageMs) && ageMs >= 0 && ageMs < oneDaySeconds * 1000;
}

export async function isAdminSession() {
  const store = await cookies();
  return verifyToken(store.get(cookieName)?.value);
}

export async function setAdminSession() {
  const store = await cookies();
  store.set(cookieName, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: oneDaySeconds
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(cookieName);
}
