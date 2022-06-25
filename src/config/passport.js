const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
require('dotenv-expand')(require('dotenv').config())

const { userServices } = require('../services')
const { HTTP_CODES, STATUS } = require('../helpers/constants')

const SECRET_KEY = process.env.JWT_SECRET_KEY

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}
passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await userServices.findUserById(payload.id)
      if (!user) {
        done(
          new Error({
            status: STATUS.ERROR,
            code: HTTP_CODES.UNAUTHORIZED,
            message: 'Invalid credentials',
          }),
        )
      }
      if (!user.token) {
        return done(null, false)
      }
      return done(null, user)
    } catch (error) {
      done(error)
    }
  }),
)