const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/User");
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const SECRET = process.env.SECRET_KEY;
const params = {
  secretOrKey: SECRET,
  // Authorization: Bearer <<TOKEN>>
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findOne({ _id: payload.id }, { password: 0 });

      if (!user) {
        return done(new Error("User not found"));
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);