const bcrypt = require('bcrypt')

const { User } = require('../../db/userModel')
const { NotAuthorizedError } = require('../../helpers/errors')

const logout = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`)
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Wrong password')
  }

  await User.findByIdAndUpdate({ _id: user._id }, { $set: { token: null } })
}

module.exports = { logout }
