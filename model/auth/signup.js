const {
  UserModel
} = require('../../db/userModel')
const {
  Conflict
} = require('http-errors')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')

const signup = async (email, password) => {
  const verificationToken = nanoid()
  const newUser = new UserModel({
    email,
    password,
    avatarURL: gravatar.url(email),
    verificationToken
  })
  const existenceCheck = await UserModel.findOne({
    email, verify: false
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
