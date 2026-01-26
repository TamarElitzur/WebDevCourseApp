const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const path = require("path");
const fs = require("fs");

const SESSION_DIR = process.env.SESSION_DIR || path.join(__dirname, "..");
if (!fs.existsSync(SESSION_DIR)) fs.mkdirSync(SESSION_DIR, { recursive: true });

module.exports = session({
  store: new SQLiteStore({
    db: "session.sqlite",
    dir: SESSION_DIR,
  }),
  secret: process.env.SESSION_SECRET || "replace_this_with_env_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
    // In Render (HTTPS) you can optionally set:
    // secure: true,
    // sameSite: "lax",
  },
});
