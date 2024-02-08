import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import User from "../models/User.js";

export default function setJWTStrategy() {
  const secret = process.env.SECRET;
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: Bearer <TOKEN>
  };

  passport.use(
    new JWTStrategy(params, async function (payload, done) {
      try {
        const user = await User.find({ _id: payload.id }).lean();
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
// to jest pierwszy plik z konspektu
