import passport from "passport";
import passportJWT from "passport-jwt";
import { findUserById } from "../service/index.js";

import dotenv from "dotenv";

dotenv.config();

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

export default function setJWTStrategy() {
  const secret = process.env.SECRET;

  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new Strategy(params, async function (payload, done) {
      try {
        const user = await findUserById(payload.id);
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      } catch (e) {
        return done(err);
      }
    })
  );
}
