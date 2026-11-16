// Vercel serverless function: reads your public Letterboxd diary feed
// and returns your recent films as JSON for the Interests and Stats pages.
// Change USERNAME if your Letterboxd username changes.
const USERNAME = "Rutvkk";

function tag(block, name) {
  const m = block.match(new RegExp("<" + name + ">([^<]*)</" + name + ">"));
  return m ? m[1].trim() : "";
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

module.exports = async function handler(req, res) {
  try {
    const r = await fetch("https://letterboxd.com/" + USERNAME + "/rss/", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; personal-portfolio)" }
    });
    if (!r.ok) throw new Error("Feed returned " + r.status);
    const xml = await r.text();

    const films = xml
      .split("<item>")
      .slice(1)
      .map(function (block) {
        const title = decode(tag(block, "letterboxd:filmTitle"));
        const date = tag(block, "letterboxd:watchedDate");
        if (!title || !date) return null;
        const year = parseInt(tag(block, "letterboxd:filmYear"), 10);
        const desc = block.match(/<description>\s*<!\[CDATA\[([\s\S]*?)\]\]>/);
        const img = desc ? desc[1].match(/<img[^>]*src="([^"]+)"/) : null;
        const link = tag(block, "link");
        const rating = parseFloat(tag(block, "letterboxd:memberRating"));
        return {
          t: title,
          y: isNaN(year) ? "" : year,
          r: isNaN(rating) ? null : rating,
          d: date,
          p: img ? img[1] : "",
          l: /^https:\/\/letterboxd\.com\//.test(link) ? link : ""
        };
      })
      .filter(Boolean)
      .slice(0, 40);

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({ films: films });
  } catch (err) {
    res.status(502).json({ films: [], error: "Feed unavailable" });
  }
};
