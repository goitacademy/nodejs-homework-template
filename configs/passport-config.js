const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const userService = require('../services/auth');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const settings = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

const jwtStrategy = new Strategy(settings, async (payload, done) => {
  try {
    const user = await userService.getById(payload.id);
    if (!user) {
      throw new Error('Not found');
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use('jwt', jwtStrategy);

module.exports = passport;
