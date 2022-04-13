const { User } = require('../../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { SECRET_KEY } = process.env

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !user.comparePassword(password)) {
      res.status(400).json({
        status: 'Wrong email or password',
        code: 400,
      })
    }
    const payload = {
      _id: user.id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
    await User.findByIdAndUpdate(user._id, { token })
    res.status(201).json({
      status: 'success',
      code: 200,
      message: 'login success',
      data: {
        user: {
          email: email,
          subscription: user.subscription,
          token: token
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
