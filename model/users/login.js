const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { User } = require('../../db/userModel')
const { NotAuthorizedError } = require('../../helpers/errors')

const login = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`)
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Wrong password')
  }

  const token = jwt.sign({
    _id: user._id,
  }, process.env.JWT_SECRET)
  await User.findByIdAndUpdate({ _id: user._id }, { $set: { token: token } })
  return token
}

module.exports = { login }
