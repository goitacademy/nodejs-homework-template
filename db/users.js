const User = require('../db/Shemas/usersModel')

const findUserByEmail = async email => {
  return await User.findOne({ email })
}

const addUser = async options => {
  const user = new User(options)
  return await user.save()
}

const findUserById = async id => {
  return await User.findOne({ _id: id })
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const getCurrentUser = async id => {
  return await User.findOne({ _id: id }, 'email')
}

module.exports = {
  findUserByEmail,
  addUser,
  findUserById,
  updateToken,
  getCurrentUser,
}
