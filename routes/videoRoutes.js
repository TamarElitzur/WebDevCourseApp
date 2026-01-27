const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth); // Protect all routes

// 1. Main Page (Matches your Dashboard button)
router.get("/videos", videoController.getVideosPage);

// 2. Search API (Must match the fetch URL in your HTML)
router.get("/videos/search", videoController.searchVideos);

// 3. Actions
router.post("/videos/add", videoController.addFavorite);
router.post("/videos/delete", videoController.removeFavorite);

module.exports = router;