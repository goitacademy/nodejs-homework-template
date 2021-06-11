const passport = require("passport");

const { Strategy, ExtractJwt } = require("passport-jwt");

require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const User = require("../model/users.model");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

passport.use(
  new Strategy(opts, async function (payload, done) {
    try {
      const foundUser = await User.findById(payload.id);

      if (!foundUser) {
        return done(new Error("User not found"), false);
      }
      if (!foundUser.token) {
        return done(null, false);
      }
      if (!foundUser.verify) {
        return done(null, false);
      }
      return done(null, foundUser);
    } catch (err) {
      return done(err, false);
    }
  })
);
