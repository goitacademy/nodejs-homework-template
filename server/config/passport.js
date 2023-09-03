import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import User from "../models/user.js";
import "dotenv/config";

const params = {
  secretOrKey: process.env.SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

export default passport;
