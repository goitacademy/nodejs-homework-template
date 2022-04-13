const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    if (typeof req.headers.authorization !== 'string') {
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
      })
    }
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
      })
    }
    try {
      const { _id } = jwt.verify(token, SECRET_KEY)
      const user = await User.findById(_id)
      if (!user) {
        res.status(401).json({
          status: 'User not found',
          code: 401,
        })
      }
      if (!user.token) {
        res.status(401).json({
          status: 'Unauthorized',
          code: 401,
        })
      }
      req.user = user
      next()
    } catch (error) {
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
