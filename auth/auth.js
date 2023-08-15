const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/users/model");
require("dotenv").config();

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: process.env.SECRET_KEY,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    console.log(payload._doc._id);
    User.find({ _id: payload._doc._id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        if (!user.token) {
          return done(new Error("User not logged in"));
        }
        return done(null, user);
      })
      .catch(err => done(err));
  })
);
