const passport = require('passport')
const passportJWT = require('passport-jwt')
const User = require('../model/schemas/user')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const { ExtractJwt, Strategy } = passportJWT
const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new Strategy(params, async (payload, done) => {
    const user = await User.findOne({ email: payload.email })
    if (user) {
      done(null, user)
    }
  })
)
