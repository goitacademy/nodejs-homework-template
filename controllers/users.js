require('dotenv').config()
const jwt = require('jsonwebtoken')
const Users = require('../model/users') // findByEmail, findById, findByToken, create, updateToken
const { HttpCode } = require('../helpers/constants')
const SECRET_KEY = process.env.JWT_SECRET

// === REGISTRATION ===
const reg = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await Users.findByEmail(email)
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: { status: 'conflict', message: 'Email in use' },
      })
    }

    const newUser = await Users.create(req.body)

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

// === LOGIN ===
const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user.validPassword(password)

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: { status: 'UNAUTHORIZED', message: 'Email or password is wrong' },
      })
    }

    const id = user._id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
    await Users.updateToken(id, token)

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

// === LOGOUT ===
const logOut = async (req, res, next) => {
  const userId = req.user.id
  await Users.updateToken(userId, null)
  return res.status(HttpCode.NO_CONTENT).json({})
}

// === GET USER ===
const getUser = async (req, res, next) => {
  try {
    const [, token] = req.get('Authorization').split(' ')
    const user = await Users.findByToken(token)
    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: { status: 'UNAUTHORIZED', message: 'Not authorized' },
      })
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { reg, logIn, logOut, getUser }
