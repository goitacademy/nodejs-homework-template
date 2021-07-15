const passport = require('passport')
const passportJwt = require('passport-jwt')
require('dotenv').config()

const { users: service } = require('../services')

const { ExtractJwt, Strategy } = passportJwt

const { SECRET_KEY } = process.env

const settings = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
}

passport.use(
  new Strategy(settings, async (payload, done) => {
    try {
      const user = await service.findById(payload.id)
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
