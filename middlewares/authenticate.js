const jwt = require('jsonwebtoken')

const { User } = require('../model')

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')

    if (bearer !== 'Bearer') {
      return res.status(401).json({
        status: '401 Unauthorized',
        code: 401,
        message: 'Email or password is wrong'
      })
    }

    const user = await User.findOne({ token })

    if (!user) {
      return res.status(401).json({
        status: '401 Unauthorized',
        code: 401,
        message: 'Email or password is wrong'
      })
    }
    req.user = user
    next()

  } catch (error) {
    next(error)
  }
}

module.exports = authenticate