const jwt = require('jsonwebtoken')
const { findUserById } = require('../db/users')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const userMiddleware = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return res.status(401).json({ message: 'Not authorized' })
  }

  try {
    const [, token] = req.headers.authorization.split(' ')
    jwt.verify(token, JWT_SECRET_KEY, async (error, decoded) => {
      const user = await findUserById(decoded?.id)
      if (error || !user || !user.token || user.token !== token) {
        return res.status(401).json({ message: 'Invalide token' })
      }

      req.user = user
      next()
    })
  } catch (error) {
    next(error.message)
  }
}

module.exports = {
  userMiddleware,
}
