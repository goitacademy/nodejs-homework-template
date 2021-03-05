const passport = require('passport')
const Users = require('../model/users')
const { ExtractJwt, Strategy } = require('passport-jwt')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

const params = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
    new Strategy(params, async (payload, done) => {
        try {
            const user = Users.findById(payload.id)
            if (!user) {
                return done(new Error('User not found'))
            }
            if (!user.token) {
                return done(null, false)
            }
            return done(null, user)

        } catch (error) {
            done(error)
        }


    })
)
