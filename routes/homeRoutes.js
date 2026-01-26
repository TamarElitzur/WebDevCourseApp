const express = require("express");
const router = express.Router();
const { requireLogin } = require("../middleware/authMiddleware");

router.get("/", requireLogin, (req, res) => {
  res.render("home", { user: req.session.user });
});

module.exports = router;
