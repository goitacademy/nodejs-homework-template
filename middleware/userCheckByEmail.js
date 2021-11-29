const { UserModel } = require('../db/userModel')
const { NotFound } = require('http-errors')

const userCheckByEmail = async (req, res, next) => {
  const { email } = req.body
  const user = await UserModel.findOne({ email })
  if (!user) throw new NotFound('User not found')
  next()
}

module.exports = {
  userCheckByEmail
}
