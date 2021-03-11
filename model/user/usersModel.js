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

const createUser = async ({ email, password, name, subscription }) => {
  const salt = await bcrypt.genSalt(SALT)
  const pass = await bcrypt.hash(password, salt)
  console.log(pass)
  const newUser = new User({ email, password: pass, name, subscription })
  return await newUser.save()
}

const updateTokenUser = async (id, token) => {
  await User.updateOne({ _id: id }, { token })
  const updatedUser = await findUserById(id)
  return updatedUser
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateTokenUser
}
