const jwt = require('jsonwebtoken')
require('dotenv').config()
const { User } = require('../db/user')
const { CustomError } = require('.././template/error')
const { code } = require('.././template/http-code-template')
const SECRET_KEY = process.env.JWT_SECRET_KEY

const signup = async (body) => {
  try {
    const user = new User({ ...body })
    await user.save()
    return user
  } catch (error) {
    return error
  }
}

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email })
    if (!user || !user.validPassport(password)) {
      return new CustomError(code.UNAUTHORIZED, 'Email or password is wrong')
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      SECRET_KEY,
      { expiresIn: '1h' },
    )

    return await User.findByIdAndUpdate(user._id, { token }, { new: true })
  } catch (error) {
    return error
  }
}

const logout = async (id) => {
  try {
    return await User.findByIdAndUpdate(id, { token: null }, { new: true })
  } catch (error) {
    return error
  }
}

const current = async (id) => {
  try {
    const user = await User.findById(id)
    return user
  } catch (error) {
    return error
  }
}

module.exports = {
  signup,
  login,
  logout,
  current,
}