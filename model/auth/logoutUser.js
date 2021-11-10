const User = require('../../schemas/User')

const logoutUser = async (user) => {
  return await User.findByIdAndUpdate(user._id, { token: null })
}

module.exports = { logoutUser }
