const passport = require("passport");
const passportJWT = require("passport-jwt");
const mongoose = require("mongoose");
const Users = require("../schemas/users");
require("dotenv").config();
const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  "jwt",
  new Strategy(params, async (payload, done) => {
    const objectId = new mongoose.Types.ObjectId(payload.id);
    const findUser = await Users.findOne({ _id: objectId });
    if (!findUser) {
      return done(null, false);
    }
    return done(null, findUser);
  })
);
