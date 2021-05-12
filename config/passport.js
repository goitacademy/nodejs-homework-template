const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const Users = require('../model/userModel');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

passport.use(
  new Strategy(opts, async (jwtPayload, done) => {
    try {
      const user = await Users.findById(jwtPayload.id);
      if (!user) {
        return done(new Error('User not found!'));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);
