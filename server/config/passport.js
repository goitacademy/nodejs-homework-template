import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import User from "../services/models/users.js";

const params = {
  secretOrKey: process.env.SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      user ? done(null, user) : done(new Error("User not found"));
    } catch (err) {
      done(err);
    }
  })
);
