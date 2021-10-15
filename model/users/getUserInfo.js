const { User } = require('../../db/userModel')

const getUserInfo = async (user) => {
  const currentUser = await User.findById(user._id)
  return currentUser
}

module.exports = { getUserInfo }
