const jwt = require('jsonwebtoken')
const User = require('../schemas/User')

const { SECRET_KEY } = process.env

const authorize = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      res.json({
        status: 'Unauthorized',
        code: 401,
        message: 'Not authorized'
      })
    }

    jwt.verify(token, SECRET_KEY)

    const user = await User.findOne({ token })

    if (!user) {
      res.json({
        status: 'Unauthorized',
        code: 401,
        message: 'Not authorized'
      })
    }

    req.user = user

    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = authorize
