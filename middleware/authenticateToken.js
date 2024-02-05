// middleware/authenticateToken.js
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/users/userModel.js';

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
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

passport.use(jwtStrategy);
  
const authenticateToken = (req, res, next) => {
    console.log('Request Headers:', req.headers);
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        console.log('Error:', err);
        console.log('User:', user);
        console.log('Info:', info);
        
        if (err) {
            console.error('Error during authentication:', err);
            return res.status(401).json({ message: 'Authentication error' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Not enough rights' });
        }

        req.user = user;
        next();
    })(req, res, next);
};

  export { authenticateToken };
