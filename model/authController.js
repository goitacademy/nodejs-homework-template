const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../db/userModel')

const signupUser = async (email, password) => {
  const user = new User({ email, password })
  await user.save()
  const responseUser = {}
  responseUser.user = user
  return responseUser
}
const loginUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Email or password is wrong')
  }
  const token = jwt.sign({
    _id: user._id
  }, process.env.JWT_SECRET)
  await User.findByIdAndUpdate(user._id, { $set: { token: token } })
  const responseUser = {}
  responseUser.token = token
  responseUser.user = user
  return responseUser
}
const logoutUser = async (userId) => {
  const user = await User.findOne({ _id: userId })
  if (Object.keys(user).length === 0) { return undefined }
  await User.findByIdAndUpdate(user._id, { $set: { token: null } })
  return user
}
const currentUser = async (userId) => {
  const { email, subscription } = await User.findOne({ _id: userId })
  if (!email) { return undefined }
  const responseUser = {}
  responseUser.email = email
  responseUser.subscription = subscription
  return responseUser
}

// ошибки таймкод 1:34:00

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
}
