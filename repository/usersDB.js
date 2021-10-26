const User = require('../model/user')

const findById = async (id) => {
  return await User.findById(id)
}

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const create = async (reqBody) => {
  const { email, password, subscription } = reqBody
  const user = new User({ email, subscription })
  user.setPassword(password)
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate(id, {token})
}

const updateAvatar = async (id, avatarUrl) => {
  return await User.findByIdAndUpdate(id, {avatarUrl}, {new: true})
}

module.exports = { findById, findByEmail, create, updateToken, updateAvatar }