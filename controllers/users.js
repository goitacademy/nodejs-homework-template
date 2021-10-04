const { Conflict, BadRequest } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../model')

const signup = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const newUser = new User({ email })

  newUser.setPassword(password)

  await newUser.save()

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  })
}

const { SECRET_KEY } = process.env

const signin = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password')
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Email or password is wrong')
  }

  const { _id } = user
  const payload = {
    _id,
  }
  const token = jwt.sign(payload, SECRET_KEY)

  const resUser = await User.findByIdAndUpdate(_id, { token })
  res.json({
    token: token,
    user: { email: resUser.email, subscription: resUser.subscription },
  })
}

const signout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.status(204).json({})
}

module.exports = { signup, signin, signout }
