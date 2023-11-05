import passport from "passport";
import passportJWT from "passport-jwt";
import { User } from "../service/schemas/User.js";
import "dotenv/config";

export default function setJWTStrategy() {
  const secret = process.env.SECRET;

  const ExtractJWT = passportJWT.ExtractJwt;
  const Strategy = passportJWT.Strategy;
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new Strategy(params, async function (payload, done) {
      try {
        const user = User.find({ _id: payload.id }).lean();
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    })
  );
}
