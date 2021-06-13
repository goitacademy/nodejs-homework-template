const User = require('../schemas/user')

const findById = async (id) => {
  const user = await User.findById(id)
  return user
}
const findByEmail = async (email) => {
  const user = await User.findOne({ email })
  return user
}

const create = async (options) => {
  const newUser = new User(options)
  return await newUser.save()
}

const updateToken = async (id, token) => {
  const updatedToken = await User.findByIdAndUpdate(id, { token })
  return updatedToken
}

const current = async (token) => {
  const user = await User.findOne({ token })
  return user
}

const updateAvatar = async (id, avatar) => {
  return await User.findByIdAndUpdate(id, { avatar })
}

const getUserByVerifyToken = async (token) => {
  return await User.findOne({ verifyToken: token })
}

const updateVerifyToken = async (id, verify, token) => {
  return await User.updateOne({ _id: id }, { verify, verifyToken: token })
}

module.exports = {
  findById,
  create,
  findByEmail,
  updateToken,
  current,
  updateAvatar,
  getUserByVerifyToken,
  updateVerifyToken,
}
