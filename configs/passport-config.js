const passport = require("passport")
const { ExtractJwt, Strategy } = require("passport-jwt")
const services = require("../services/user")
const { SECRET_KEY } = process.env
require("dotenv").config()

const settings = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
}

const jwtStrategy = new Strategy(settings, async (payload, done) => {
  try {
    const user = await services.getById(payload.id)
    if (!user) {
      throw new Error("Not found")
    }
    done(null, user)
  } catch (error) {
    // console.log(error)
    done(error)
  }
})

passport.use("jwt", jwtStrategy)
