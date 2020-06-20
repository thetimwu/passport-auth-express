const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      //options for the google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, freshToken, profile, done) => {
      //passport callback function
      const currentUser = await User.findOne({ googleId: profile.id });

      if (currentUser) {
        console.log("user " + profile.displayName + " already exist");
        done(null, currentUser);
      } else {
        const newUser = await new User({
          username: profile.displayName,
          googleId: profile.id,
        }).save();
        done(null, newUser);
      }
    }
  )
);
