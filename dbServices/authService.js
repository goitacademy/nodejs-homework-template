const { User } = require('../dbModels/userModel')
const bcrypt = require('bcrypt')
// const { NotAuthorizedError } = require('../errorHelpers/errors')
const jwt = require('jsonwebtoken')

const registration = async (password, email, subscription) => {
  const user = new User({
    password: await bcrypt.hash(password, 10),
    email,
    subscription,
  })
  await user.save()
}
const login = async (email, passwordOnEnter) => {
  const { password, _id, createdAt } = await User.findOne({
    email,
  })
  const rightPassword = await bcrypt.compare(passwordOnEnter, password)
  if (rightPassword) {
    const token = jwt.sign({ _id, createdAt }, process.env.JWT_SECRET)
    return token
  }
  return rightPassword
}
const getUsersService = async () => {
  const users = await User.find({})
  return users
}
module.exports = { registration, login, getUsersService }
