const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

require("dotenv").config();
const SECRET = process.env.SECRET_KEY;
const User = require("../models/user");

const params = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findOne({ _id: payload.id });

      if (!user) {
        return done(new Error("User not found"));
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);
