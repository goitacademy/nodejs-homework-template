const { Unauthorized, BadRequest, Conflict } = require('http-error')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { joiRegisterSchema, joiLoginSchema } = require('../model/user')
const { User } = require('../model/index')

const { SECRET_KEY } = process.env

const signupUser = async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { password, email, subscription } = req.body
    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict('Email in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hashingPassword = await bcrypt.hash(password, salt)
    const newUser = await User.create({
      password: hashingPassword,
      email,
      subscription,
    })
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

//
const loginUser = async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { email, password, subscription } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      throw new Unauthorized('Email is wrong')
    }
    const passwordMatching = await bcrypt.compare(password, user.password)
    if (!passwordMatching) {
      throw new Unauthorized('Password is wrong')
    }

    const { _id } = user
    const payload = {
      id: _id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })

    await User.findByIdAndUpdate(_id, { token })
    res.json({
      token,
      user: {
        email,
        subscription,
      },
    })
  } catch (error) {
    if (Unauthorized) {
      error.status = 401
    }
    next(error)
  }
}

const logoutUser = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.status(204).send()
}

const getUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Unauthorized('Not authorized')
    }
    const { email, subscription } = req.user
    res.json({
      user: {
        email,
        subscription,
      },
    })
  } catch (error) {
    if (error) {
      error.status = 401
    }
    next()
  }
}

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getUser,
}
