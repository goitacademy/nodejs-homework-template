const passport = require('passport')
const passportJWT = require('passport-jwt')

require('dotenv').config()
const { SECRET_KEY } = process.env

const ExtractJWT = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy

const { user: service } = require('../services')

const params = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
}

const jwtStrategy = new Strategy(params, async (payload, done) => {
  try {
    const user = await service.getById(payload.id)
    if (!user) {
      return done(new Error('User not found'))
    }
    return done(null, user)
  } catch (err) {
    done(err)
  }
})

passport.use('jwt', jwtStrategy)
