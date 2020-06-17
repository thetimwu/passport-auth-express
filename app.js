const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetting = require("./config/passport-setup");

const app = express();

app.set("view engine", "ejs");

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("app now listening for request on port 3000");
});
