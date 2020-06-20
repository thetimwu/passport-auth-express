const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetting = require("./config/passport-setup");
const mongoose = require("mongoose");
const key = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [key.session.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/google-auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

mongoose.connection
  .once("open", () => {
    console.log("Connection has been made.");
  })
  .on("error", (err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(3000, () => {
  console.log("app now listening for request on port 3000");
});
