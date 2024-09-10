import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { User } from "../models/user.js";

export default function setJWTStrategy() {
  const secret = process.env.SECRET;
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new JWTStrategy(params, async function (payload, done) {
      try {
        const user = await User.findById({
          _id: payload.id,
        }).lean();
        if (!user) {
          return done(null, false, { message: "User is not found." });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
}
