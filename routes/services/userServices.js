const { User } = require('../../db/userModel')
const { Conflict, Unauthorized, NotFound } = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registration = async (email, password) => {
  const userExist = await User.findOne({ email })
  if (userExist) {
    throw new Conflict(`User with email ${email} is already exist`)
  }
  const user = new User({
    email,
    password,
  })
  await user.save()
}

const login = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFound(`User with email ${email} not found`)
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new Unauthorized('Email or password is wrong, try again')
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  )
  await User.findOneAndUpdate(email, { token })
  return token
}

const addToken = async (email, token) => {
  const result = await User.findOneAndUpdate({ email }, { token })
  return result
}

const getCurrent = async (_id) => {
  const user = await User.findById({ _id })
  return user
}

const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: null })
}

const updateSubscription = async (id, subscription) => {
  const result = await User.findByIdAndUpdate(id, { subscription })
  return result
}

module.exports = {
  registration,
  login,
  getCurrent,
  logout,
  addToken,
  updateSubscription,
}
