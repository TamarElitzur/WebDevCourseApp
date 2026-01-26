const express = require("express");
const path = require("path");
const sessionMiddleware = require("./config/session");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middleware/requireAuth");

const app = express();

console.log("app.js loaded");

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// body parsing
app.use(express.urlencoded({ extended: true }));

// sessions
app.use(sessionMiddleware);

// make user available in views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.get("/ping", (req, res) => res.send("pong"));

// routes
app.use(authRoutes);

const homeRoutes = require("./routes/homeRoutes");
app.use("/", homeRoutes);

const videoRoutes = require("./routes/videoRoutes");
app.use(videoRoutes);

// fallback
app.use((req, res) => {
    res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} updated ...`));


