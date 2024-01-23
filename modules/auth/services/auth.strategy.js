import "dotenv/config.js";
import passport from "passport";
import passportJWT from "passport-jwt";
import { User } from "../../users/schemas/user.schema.js";

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: process.env.TOKEN_SECRET,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
      User.findById(payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(new Error("Token is invalid"), null);
        })
        .catch((e) => {
          return done(e, null);
        });
    }
  )
);
