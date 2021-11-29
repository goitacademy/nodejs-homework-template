const { UserModel } = require('../../db/userModel')
const { Unauthorized } = require('http-errors')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const signin = async (email, password) => {
  const user = await UserModel.findOne({ email, verify: true })
  if (!user) {
    throw new Unauthorized('Credentials are wrong or you didn*t verify your email')
  }
  const check = await bcrypt.compare(password, user.password)
  if (!check) throw new Unauthorized('Email or password is wrong')

  const token = await jsonwebtoken.sign({
    _id: user._id,
    mail: user.email,
    subscription: user.subscription,
  }, process.env.SECRET_WORD)

  return token
}

module.exports = {
  signin
}
