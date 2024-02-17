import passport from "passport";
import passportJWT from "passport-jwt";
import { User } from "../service/schemas/users.js";

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
    new Strategy(params, (payload, done) => {
      User.findOne({ _id: payload.id })
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(new Error("User not found"));
        })
        .catch((err) => {
          return done(err);
        });
    })
  );
}
