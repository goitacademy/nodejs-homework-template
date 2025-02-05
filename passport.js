const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("./service/schemas/user");
require("dotenv").config();
const secret = process.env.AUTH_SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.findById(payload.id)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

module.exports = passport;
