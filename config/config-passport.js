const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const Users = require('../model/user')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET

const params = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(
    new Strategy(params, async (payload, done) => {
        try {
            const user = await Users.findById(payload.id)
            if (!user) {
                return done(new Error('User not found'))
            }
            if (!user.token) {
                return done(null, false)
            }
            return done(null, user)
        } catch (err) {
            done(err)
        }
    })
)