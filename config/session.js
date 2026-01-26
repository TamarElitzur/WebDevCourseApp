const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const path = require("path");

module.exports = session({
  store: new SQLiteStore({
    db: "session.sqlite",

    dir: path.join(__dirname, ".."),
  }),
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // שעה
  },
});
