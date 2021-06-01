const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('../schemas/user')
const {
  getuserById,
} = require('../model/user')
require('dotenv').config()
const SEKRET_KEY = process.env.JWT_SECRET_KEY

const params = {
  secretOrKey: SEKRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

// Тут поъхоже ошибка - нужно заменить функцию на схему User
passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await getuserById(payload.id)
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
  })
)
