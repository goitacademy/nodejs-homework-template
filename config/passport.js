const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Users = require("../repository/users");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await Users.findById(payload.id);
      if (!user) {
        return done(new Error("User not found"));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);
