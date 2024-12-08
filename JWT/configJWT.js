const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const User = require("../models/user");
require("dotenv").config();

const JWTStrategy = () => {
  const secret = process.env.SECRET;
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  passport.use(
    new Strategy(params, async function (payload, done) {
      try {
        const user = await User.findOne({ _id: payload.id });
        if (!user) {
          return done(new Error("User not found."));
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};

module.exports = JWTStrategy;
