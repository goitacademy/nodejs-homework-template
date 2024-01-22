import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
const { JWT_SECRET } = process.env

export const authenticate = async (req, _, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return next(new createHttpError.Unauthorized('Authorization not define'))
  }
  const [bearer, token] = authorization.split(' ')
  if (bearer !== 'Bearer') {
    return next(new createHttpError.Unauthorized())
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(id)
    if (!user || !user.token || token !== user.token) {
      return next(new createHttpError.Unauthorized())
    }
    req.user = user
    next()
  } catch (error) {
    next(new createHttpError.Unauthorized(error.message))
  }
}
