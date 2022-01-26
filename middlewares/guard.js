import jwt from 'jsonwebtoken'
import repositoryUsers from '../repository/users'
import { HttpCode } from '../lib/constants'

const SECRET_KEY = process.env.JWT_SECRET_KEY

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, SECRET_KEY)
    return !!verify
  } catch (e) {
    return false
  }
}

const guard = async (req, res, next) => {
  const token = req.get('authorization')?.split(' ')[1]
  console.log(
    "🚀 ~ file: guard.js ~ line 18 ~ guard ~ req.get('authorization')",
    req.get('authorization'),
  )
  const isValidToken = verifyToken(token)
  if (!isValidToken) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    })
  }
  const payload = jwt.decode(token)
  const user = await repositoryUsers.findById(payload.id)
  if (!user || user.token !== token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    })
  }
  req.user = user // res.locals.user = user
  next()
}

export default guard
