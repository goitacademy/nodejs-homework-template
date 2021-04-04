const passport = require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt')
require('dotenv').config()
const { findById} = require('../model/users');
const SECRET_KEY = process.env.SECRET_KEY
const params = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}


passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await findById(payload.id);
      if (!user) {
        return done(new Error('User not found'));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  }),
);
