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
const login = async (email, password) => {
  let user = await User.findOne({
    email,
  })
  const rightPassword = await bcrypt.compare(password, user.password)
  if (rightPassword) {
    const createdAt = new Date()
    const token = jwt.sign({ _id: user._id, createdAt }, process.env.JWT_SECRET)
    user.token = token
    user = await User.findOneAndUpdate(
      { email },
      {
        $set: user,
      },
    )
    console.log(user)
    return user.token
  }
  return rightPassword
}
const logout = async token => {
  let user = await User.findOneAndUpdate(
    { token },
    {
      $set: { token: null },
    },
  )
  user = await User.findById(user._id)
  return user.token
}
const getUsersService = async () => {
  const users = await User.find({})
  return users
}
module.exports = { registration, login, logout, getUsersService }
