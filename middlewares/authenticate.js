const passport = require("passport");
const passportJWT = require("passport-jwt");
require("dotenv").config();

const { userModel } = require("../models");
const { User } = userModel;
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.findOne({ _id: payload.id })
      .then((user) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

const authenticate = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!req.get("Authorization")) {
      return HttpError(401, "Not authorized");
    }

    const token = req.get("Authorization").replace("Bearer ", "");

    if (!user || err || !token || token !== user.token) {
      return HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticate;
