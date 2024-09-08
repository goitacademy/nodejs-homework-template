const passport = require("passport");
const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");
const User = require("../models/userSchema");
require("dotenv").config();

const secret = process.env.SECRET;
const setJWTStrategy = () => {
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new JWTStrategy(params, async function (payload, done) {
      try {
        const user = await User.findOne({ _id: payload.id }).lean();
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};
module.exports = { setJWTStrategy };