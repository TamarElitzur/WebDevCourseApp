const express = require("express");
const path = require("path");
const sessionMiddleware = require("./config/session");
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const videoRoutes = require("./routes/videoRoutes");

const app = express();

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body Parsing
app.use(express.urlencoded({ extended: true }));

// Serve Static Files (CSS)
app.use(express.static("public"));

// Sessions
app.use(sessionMiddleware);

// User Middleware
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Routes
app.use(authRoutes);
app.use("/", homeRoutes);
app.use(videoRoutes);

// Fallback
app.use((req, res) => {
    res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));