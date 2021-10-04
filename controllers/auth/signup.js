const { Conflict } = require('http-errors')
// const bcrypt = require('bcryptjs')
const sendSuccessResponse = require('../../helpers')
const { User } = require('../../models')

const signup = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }
  const newUser = new User({ email })
  newUser.setPassword(password)
  const result = await newUser.save()
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  // const newUser = { email, password: hashPassword }
  // const result = await User.create(newUser)
  sendSuccessResponse(res, { data: result }, 201)
}

module.exports = {
  signup
}
