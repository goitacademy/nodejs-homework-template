const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { UsersService } = require('../services')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      console.log(
        '🚀 ~ file: passport.js ~ line 31 ~ newStrategy ~ payload',
        payload,
      )
      const service = new UsersService()
      const user = await service.findById(payload.id)
      console.log('🚀 ~ file: passport.js ~ line 21 ~ newStrategy ~ user', user)
      if (!user) {
        return done(new Error('User not found'))
      }
      if (!user.token) {
        return done(null, false)
      }
      return done(null, user)
    } catch (e) {
      done(e)
    }
  }),
)
