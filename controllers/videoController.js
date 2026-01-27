const favoriteRepo = require("../repositories/favoriteRepository");


const YOUTUBE_API_KEY = "AIzaSyCzM8S4Q9h5vo-fyRIc55sdO1Xk3ikRYjI";

exports.getVideosPage = async (req, res) => {
    try {
        const favorites = await favoriteRepo.findByUserId(req.session.user.id);
        res.render("videos", { 
            user: req.session.user, 
            favorites: favorites 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching videos");
    }
};

// === NEW: SEARCH FUNCTION ===
exports.searchVideos = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.json([]);
        
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`
        );
        const data = await response.json();

        if (data.error) {
            console.error("YouTube API Error:", data.error);
            return res.status(500).json({ error: "Failed to fetch from YouTube" });
        }

        // Send just the list of items to the frontend
        res.json(data.items || []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.addFavorite = async (req, res) => {
    try {
        const { youtubeId, title, thumbnailUrl } = req.body;
        const userId = req.session.user.id;
        
        await favoriteRepo.create({ userId, videoId: youtubeId, title, thumbnailUrl });
        res.redirect("/videos");
    } catch (err) {
        // Ignore duplicates silently or log them
        console.log("Video might already exist");
        res.redirect("/videos");
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const { id } = req.body;
        await favoriteRepo.delete(id);
        res.redirect("/videos");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting favorite");
    }
};