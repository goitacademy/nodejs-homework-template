const { User } = require('../../db/userModel')

const logout = async (id) => {
  await User.findByIdAndUpdate({ _id: id }, { $set: { token: null } })
}

module.exports = { logout }
