const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetting = require("./config/passport-setup");
const mongoose = require("mongoose");
const key = require("./config/keys");

const app = express();

app.set("view engine", "ejs");

app.use("/auth", authRoutes);

mongoose.connect("mongodb://localhost:27017/google-auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => {
    console.log("Connection has been made.");
  })
  .on("error", (err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("app now listening for request on port 3000");
});
