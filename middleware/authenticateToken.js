import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/userModel.js';

import dotenv from "dotenv";
dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  const jwtStrategy = new Strategy(options, async (payload, done) => {
    try {
        const user = await User.findById(payload.userId);

        if (!user) {
            return done(null, false, { message: 'Not authorized' });
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

passport.use(jwtStrategy);
  
const authenticateToken = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        req.user = user;
        next();
    })(req, res, next);
};

  export { authenticateToken };
