// Vercel serverless function: a tiny counter for total views and appreciation.
// It stores two numbers in a free Upstash Redis database that you connect in the
// Vercel dashboard (Storage tab). Until that is connected the Stats page simply
// hides the two counters.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(cmd) {
  const path = cmd.map(function (c) { return encodeURIComponent(c); }).join("/");
  const r = await fetch(URL_ + "/" + path, { headers: { Authorization: "Bearer " + TOKEN } });
  if (!r.ok) throw new Error("Redis returned " + r.status);
  return (await r.json()).result;
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (!URL_ || !TOKEN) return res.status(503).json({ error: "Counter not connected" });
  try {
    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
      const action = body && body.action;
      if (action === "view") await redis(["incr", "rg:views"]);
      else if (action === "like") await redis(["incr", "rg:likes"]);
    }
    const out = await Promise.all([redis(["get", "rg:views"]), redis(["get", "rg:likes"])]);
    res.status(200).json({ views: Number(out[0]) || 0, likes: Number(out[1]) || 0 });
  } catch (err) {
    res.status(502).json({ error: "Counter unavailable" });
  }
};
