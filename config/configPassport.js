import passport from "passport";
import passportJWT from "passport-jwt";
import { UserModel } from "../models/users/userShema.js";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await UserModel.findById(payload.id);

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
