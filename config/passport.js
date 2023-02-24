const passport = require('passport');
const User = require('../models/userModel');

require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const { Strategy, ExtractJwt } = require('passport-jwt');
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};
passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await User.getUserById(payload.id);

      if (!user) {
        return new Error('User not found');
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
