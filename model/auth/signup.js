const {
  UserModel
} = require('../../db/userModel')
const {
  Conflict
} = require('http-errors')
const gravatar = require('gravatar')

const signup = async (email, password) => {
  const newUser = new UserModel({
    email,
    password,
    avatarURL: gravatar.url(email)
  })
  const existenceCheck = await UserModel.findOne({
    email
  })
  if (!existenceCheck) {
    const user = await newUser.save()
    return user
  }
  throw new Conflict('user already exists')
}

module.exports = {
  signup
}
