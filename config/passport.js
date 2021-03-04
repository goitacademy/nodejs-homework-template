const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { findUserById } = require('../model/user/usersModel')
require('dotenv').config()
const SECRET = process.env.JWT_SECRET

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await findUserById(payload.id)

      if (!user) {
        return done(new Error('User not faund'))
      }

      if (!user.token) {
        return done(null, false)
      }

      return done(null, user)
    } catch (error) {
      done(error)
    }
  }))
