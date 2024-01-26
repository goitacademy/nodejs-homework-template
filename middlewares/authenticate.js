const passportJWT = require("passport-jwt");
const passport = require("passport");
const User = require("../models/user");
require("dotenv").config();

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;
require("dotenv").config();
const secret = process.env.SECRET_KEY;
console.log(secret);

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

const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticate;
