const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')

const User = require('../model/Schema/user')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const params = {
    secretOrKey: JWT_SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
    new Strategy(params, async (payload, done) => {
        try {
            const user = await User.findById(payload.id)
            if (!user) {
                return done(new Error('User not found'), false)
            }
            if (!user.token) {
                return done(null, false)
            }
            return done(null, user)
        } catch (err) {
            done(err)
        }
    }),
)