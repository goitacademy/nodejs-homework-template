import passport from "passport";
import  passportJWT  from "passport-jwt";
import User from "../user/user.model.js";

import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
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