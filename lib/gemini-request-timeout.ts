/** Max wait for Gemini generateContent, ListModels, and client /api/analyze fetch (5 minutes). */
export const GEMINI_REQUEST_TIMEOUT_MS = 300_000;

/** Vercel/serverless route limit (seconds) — must match {@link GEMINI_REQUEST_TIMEOUT_MS}. */
export const GEMINI_REQUEST_TIMEOUT_SEC = GEMINI_REQUEST_TIMEOUT_MS / 1000;
