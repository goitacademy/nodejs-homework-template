const passport = require('passport')
// const { Strategy, ExtractJwt } = require('passport-jwt')
const passportJWT = require('passport-jwt')
const userModels = require('../models/users')

const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy

const params = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(
    new Strategy(params, async (jwtPayload, done) => {
        try {
            const user = await userModels.getUserByEmail(jwtPayload._id)
            if (user && jwtPayload.email === user.email) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (err) {
            return done(err, false)
        }
    })
)

module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            res.status(401).json({ message: "Not authorized" });
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
};