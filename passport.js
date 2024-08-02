const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("./service/schemas/user");
require("dotenv").config();
console.log("AUTH_SECRET from .env:", process.env.AUTH_SECRET);

const secret = process.env.AUTH_SECRET;
if (!secret) {
  throw new Error("AUTH_SECRET is not defined in the environment variables");
}

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) {
        return done(new Error("User not found"), false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

module.exports = passport;
