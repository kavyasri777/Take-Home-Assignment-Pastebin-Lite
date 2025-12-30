import { store } from "../../../lib/store";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { content, ttl_seconds, max_views } = req.body;
  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  const id = Math.random().toString(36).substring(2, 8);
  const now = Date.now();

  store[id] = {
    content,
    created_at: now,
    expires_at: ttl_seconds ? now + ttl_seconds * 1000 : null,
    max_views: max_views || null,
    views: 0,
  };

  res.status(200).json({
    id,
    url: `http://localhost:3000/p/${id}`,
  });
}