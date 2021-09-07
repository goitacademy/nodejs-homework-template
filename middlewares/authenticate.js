const { Unauthorized } = require('http-errors')

const { User } = require('../model')

const authenticate = async (req, _, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized()
    }
    const user = await User.findOne({ token })
    if (!user) {
      throw new Unauthorized()
    }

    req.user = user
    next()
  } catch (error) {
    throw new Unauthorized(error.message)
  }
}

module.exports = authenticate
