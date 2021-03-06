require('dotenv').config()
const jwt = require('jsonwebtoken')
const Users = require('../model/users') // findByEmail, findById, create, updateToken
const { HttpCode } = require('../helpers/constants')
const SECRET_KEY = process.env.GWT_SECRET

// === REGISTRATION ===
const reg = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await Users.findByEmail(email)
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'conflict',
        code: HttpCode.CONFLICT,
        data: {
          message: 'Email in use',
        },
      })
    }

    const newUser = await Users.create(req.body)

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        user: {
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
    const { email } = req.body
    const isExistUser = await Users.find(email)
    if (isExistUser) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'conflict',
        code: HttpCode.CONFLICT,
        data: {
          message: 'Email in use',
        },
      })
    }

    const user = await Users.addUser(req.body)

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
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

// === LOGOUT ===
const logOut = async (req, res, next) => {
  try {
    const { email } = req.body
    const isExistUser = await Users.find(email)
    if (isExistUser) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'conflict',
        code: HttpCode.CONFLICT,
        data: {
          message: 'Email in use',
        },
      })
    }

    const user = await Users.addUser(req.body)

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
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

module.exports = { reg, logIn, logOut }
