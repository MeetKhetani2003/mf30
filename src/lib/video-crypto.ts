import crypto from "crypto";

// Server-side secret key for AES-256-GCM encryption & HMAC-SHA256 signing
const SECRET_KEY_RAW = process.env.VIDEO_SECRET_KEY || "mws_mission_3f_video_drm_aes256_sha256_secret_key_2026";
// 32-byte key for AES-256
const CIPHER_KEY = crypto.createHash("sha256").update(SECRET_KEY_RAW).digest();

/**
 * Computes a standard SHA-256 hash of any input string
 */
export function computeSha256(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

/**
 * Computes an HMAC-SHA256 signature using the server secret
 */
export function computeHmacSha256(data: string): string {
  return crypto.createHmac("sha256", CIPHER_KEY).update(data).digest("hex");
}

/**
 * Encrypts a raw video URL using AES-256-GCM and attaches a SHA-256 checksum.
 * Output format: enc_v1_<ivHex>_<authTagHex>_<encryptedHex>
 */
export function encryptVideoUrl(rawUrl: string): { encryptedToken: string; sha256Checksum: string } {
  if (!rawUrl) return { encryptedToken: "", sha256Checksum: "" };

  const trimmed = rawUrl.trim();
  const sha256Checksum = computeSha256(trimmed);

  // If already encrypted, don't re-encrypt
  if (trimmed.startsWith("enc_v1_")) {
    return { encryptedToken: trimmed, sha256Checksum };
  }

  const iv = crypto.randomBytes(12); // 96-bit IV for GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", CIPHER_KEY, iv);

  let encrypted = cipher.update(trimmed, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");
  const encryptedToken = `enc_v1_${iv.toString("hex")}_${authTag}_${encrypted}`;

  return { encryptedToken, sha256Checksum };
}

/**
 * Decrypts an encrypted video URL token.
 * If input is a legacy plaintext URL, returns it as-is.
 */
export function decryptVideoUrl(encryptedToken: string): string | null {
  if (!encryptedToken) return null;

  const trimmed = encryptedToken.trim();
  if (!trimmed.startsWith("enc_v1_")) {
    // Legacy unencrypted URL
    return trimmed;
  }

  try {
    const parts = trimmed.split("_");
    // Expected: ["enc", "v1", ivHex, authTagHex, cipherHex]
    if (parts.length !== 5) return null;

    const iv = Buffer.from(parts[2], "hex");
    const authTag = Buffer.from(parts[3], "hex");
    const ciphertext = parts[4];

    const decipher = crypto.createDecipheriv("aes-256-gcm", CIPHER_KEY, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertext, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (err) {
    console.error("Video URL decryption error:", err);
    return null;
  }
}

/**
 * Extracts a YouTube Video ID from any standard format:
 * - https://www.youtube.com/watch?v=XXXXX
 * - https://youtu.be/XXXXX
 * - https://www.youtube.com/embed/XXXXX
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  // Handle embed url
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // Handle watch?v=
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // Handle youtu.be/
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // Raw 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    return url.trim();
  }

  return null;
}

/**
 * Generates a short-lived HMAC-SHA256 signed playback token for a student session.
 * The student client passes this token to the /api/video/player endpoint.
 */
export function generateSignedPlaybackToken(
  sessionToken: string,
  slotId: string,
  candidateName: string,
  ttlSeconds = 900 // 15 minutes validity
): string {
  const expiresAt = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payloadStr = `${sessionToken}:${slotId}:${candidateName}:${expiresAt}`;
  const signature = computeHmacSha256(payloadStr);

  const tokenData = {
    s: sessionToken,
    sl: slotId,
    n: candidateName,
    exp: expiresAt,
    sig: signature,
  };

  return Buffer.from(JSON.stringify(tokenData)).toString("base64url");
}

/**
 * Validates a signed playback token and returns payload if authentic and unexpired.
 */
export function verifySignedPlaybackToken(token: string): {
  sessionToken: string;
  slotId: string;
  candidateName: string;
} | null {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const data = JSON.parse(raw);

    const now = Math.floor(Date.now() / 1000);
    if (!data.exp || data.exp < now) {
      return null; // Expired
    }

    const payloadStr = `${data.s}:${data.sl}:${data.n}:${data.exp}`;
    const expectedSig = computeHmacSha256(payloadStr);

    if (data.sig !== expectedSig) {
      return null; // Tampered signature
    }

    return {
      sessionToken: data.s,
      slotId: data.sl,
      candidateName: data.n,
    };
  } catch {
    return null;
  }
}
