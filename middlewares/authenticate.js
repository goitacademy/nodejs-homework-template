const { User } = require('../schemas/user')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  const { authorization } = req.header
  const [bearer, token] = authorization.split(' ')
  if (bearer !== 'Bearer') {
    return res
      .status(401)
      .json({ status: 'error', code: 401, message: 'Non authorized' })
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)
    if (!user.token) {
      return res
        .status(401)
        .json({ status: 'error', code: 401, message: 'Non authorized' })
    }
    req.user = user
    next()
  } catch (error) {
    return res
      .status(401)
      .json({ status: 'error', code: 401, message: 'Non authorized' })
  }
}
module.exports = authenticate
