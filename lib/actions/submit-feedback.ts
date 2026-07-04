"use server";

export type FeedbackRating = "helpful" | "not_helpful";

export async function submitFeedback(
  rating: FeedbackRating,
  pageUrl: string,
): Promise<{ ok: boolean }> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    console.error("[feedback] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return { ok: false };
  }

  if (rating !== "helpful" && rating !== "not_helpful") {
    return { ok: false };
  }

  const label = rating === "helpful" ? "👍 Полезно" : "👎 Не полезно";
  const text = `Guide feedback: ${label}\nPage: ${pageUrl}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      },
    );

    if (!response.ok) {
      const details = await response.text();
      console.error("[feedback] Telegram sendMessage failed:", details);
      return { ok: false };
    }

    return { ok: true };
  } catch (err) {
    console.error(
      "[feedback] Telegram request error:",
      err instanceof Error ? err.message : err,
    );
    return { ok: false };
  }
}
