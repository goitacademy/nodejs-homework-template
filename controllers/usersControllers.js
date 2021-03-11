const jwt = require('jsonwebtoken')
const {
  findUserByEmail,
  createUser,
  updateTokenUser
} = require('../model/user/usersModel')
const { HttpCode } = require('../helpers/constants')
require('dotenv').config()

const SECRET = process.env.JWT_SECRET

const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await findUserByEmail(email)
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: {
          message: 'Email in use'
        }
      })
    }
    const newUser = await createUser(req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        name: newUser.name
      }
    })
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await findUserByEmail(email)
    const isValidPassword = await user?.validPassword(password)
    console.log(isValidPassword)

    if (user && isValidPassword) {
      const id = user._id
      const payload = { id }
      const token = jwt.sign(payload, SECRET, { expiresIn: '6h' })
      const updatedUser = await updateTokenUser(id, token)

      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          user: updatedUser
        }
      })
    } else {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: {
          message: 'Email or password is wrong'
        }
      })
    }
  } catch (error) {
    next(error)
  }
}

const logoutUser = async (req, res, next) => {
  const userId = req.user.id
  await updateTokenUser(userId, null)
  return res.status(HttpCode.NO_CONTENT).json({})
}

const getCurrentUser = async (req, res, next) => {
  const name = req.user.name
  const email = req.user.email
  const subscription = req.user.subscription
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      name, email, subscription
    }
  })
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
}
