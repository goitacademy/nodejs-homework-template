const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../schemas/users');
require('dotenv').config();
const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}

passport.use(new Strategy(params, (payload, done) => { 
    User.findOne({ email: payload.email }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
    })

}))