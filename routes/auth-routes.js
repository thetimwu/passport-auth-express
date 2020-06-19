const router = require("express").Router();
const passport = require("passport");
//auth login
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  res.send("logging out");
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("you are redirected from google to this page");
});

module.exports = router;
