const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { SECRET_KEY } = require('../helpers/constants');
const Users = require('../model/users');

const opts = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await Users.findById(payload.id);
      if (!user) {
        return done(new Error('User not Found'));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);
