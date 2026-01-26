exports.searchYoutube = async (req, res) => {
  try {
    const query = req.body.query;
    if (!query) return res.render("videos", { results: [], error: null });

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return res.render("videos", {
        results: [],
        error: "Missing YOUTUBE_API_KEY in environment variables",
      });
    }

    const url =
      "https://www.googleapis.com/youtube/v3/search" +
      `?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(query)}` +
      `&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    // Debug: לראות מה חזר מה-API
    console.log("YouTube API response:", data);

    // אם יש שגיאה מה-API
    if (!response.ok || data.error) {
      const msg =
        data?.error?.message ||
        `YouTube API error (status ${response.status})`;
      return res.render("videos", { results: [], error: msg });
    }

    const items = Array.isArray(data.items) ? data.items : [];

    const results = items.map((item) => ({
      videoId: item?.id?.videoId,
      title: item?.snippet?.title,
      thumbnail: item?.snippet?.thumbnails?.medium?.url,
    }));

    res.render("videos", { results, error: null });
  } catch (err) {
    console.error("searchYoutube failed:", err);
    res.render("videos", { results: [], error: "Server error while searching" });
  }
};
