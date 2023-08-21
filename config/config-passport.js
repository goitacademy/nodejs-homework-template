import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../service/schemas/users.js';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error('User not found'));
        }
        return done(null, user);
      })
      .catch(err => done(err));
  })
);

export default passport;

import { getAllUsers } from '../models/users.js';

export const auth = async (req, res, next) => {
  try {
    await passport.authenticate('jwt', { session: false }, async (err, user) => {
      if (!user || err) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Unauthorized',
          data: 'Unauthorized',
        });
      }

      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      const allUsers = await getAllUsers();
      const tokenExists = allUsers.some(user => user.token === token);
      if (!tokenExists) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Token is not authorized',
          data: 'Token not authorized',
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'An error occurred during authentication.',
    });
  }
};
