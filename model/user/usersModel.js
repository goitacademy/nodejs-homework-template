const User = require('./usersSchema')
const bcrypt = require('bcryptjs')
const { SALT } = require('../../helpers/constants')

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email })
  return user
}

const findUserById = async (id) => {
  const user = await User.findOne({ _id: id })
  return user
}

const createUser = async ({ email, password: pas, name, subscription }) => {
  const salt = await bcrypt.genSalt(SALT)
  const password = await bcrypt.hash(pas, salt)
  const newUser = new User({ email, password, name, subscription })
  return await newUser.save()
}

const updateTokenUser = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateTokenUser
}
