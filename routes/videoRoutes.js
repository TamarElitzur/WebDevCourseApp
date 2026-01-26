const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const videoController = require("../controllers/videoController");

router.get("/videos", requireAuth, videoController.showVideosPage);
router.post("/videos/search", requireAuth, videoController.searchYoutube);

module.exports = router;
