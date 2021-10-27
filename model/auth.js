// const User = require("../utils/userSchema")
const services = require("../services/user")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const register = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await services.getOne({ email })
    if (user) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: "Already exist",
      })
      return
    }

    await services.addUser({ email, password })
    res.status(201).json({
      status: "success",
      code: 201,
      message: "success",
      data: {
        email,
        password,
      },
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await services.getOne({ email })

    if (!user || !user.comparePassword(password)) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Неверный email или пароль",
      })
      return
    }
    const { SECRET_KEY } = process.env
    const payload = {
      id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY)
    await services.updateById(user._id, { token })
    res.json({
      status: "success",
      code: 200,
      data: {
        result: token,
      },
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  // console.log(req)
  try {
    await services.updateById(req.user._id, { token: null })
    res.json({
      status: "success",
      code: 200,
      message: "Logout success",
    })
  } catch (error) {
    next(error)
  }
}

const current = async (req, res, next) => {
  try {
    await services.getById(req.user._id)
    res.json({
      status: "success",
      code: 200,
      message: "Success",
      data: {
        email: req.user.email,
        subscription: req.user.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login,
  logout,
  current,
}
