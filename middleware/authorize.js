const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;


passport.use(
  new Strategy(
    {
      secretOrKey: SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id);
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

const authorize = passport.authenticate("jwt", { session: false });

module.exports = authorize;
