const { User } = require('../db/userModel')
const bcrypt = require('bcrypt')
const { NotAuthorizedError } = require('../helpers/errors')

const registration = async (password, email, subscription) => {
  const user = new User({
    password: await bcrypt.hash(password, 10),
    email,
    subscription,
  })
  await user.save()
}
const login = async (email, passwordOnEnter) => {
  const { password } = await User.findOne({
    email,
  })
  return await bcrypt.compare(passwordOnEnter, password)
}

module.exports = { registration, login }
