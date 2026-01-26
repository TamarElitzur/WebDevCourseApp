const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

router.get("/videos", requireAuth, (req, res) => {
  res.render("videos");
});

module.exports = router;
