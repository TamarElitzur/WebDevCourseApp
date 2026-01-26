const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth); // Protect all routes

router.get("/videos", videoController.getVideosPage);
router.post("/videos/add", videoController.addFavorite);
router.post("/videos/delete", videoController.removeFavorite);

module.exports = router;