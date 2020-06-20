const router = require("express").Router();

const profileMiddleware = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", profileMiddleware, (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = router;
