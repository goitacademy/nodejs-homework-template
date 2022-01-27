const { User } = require('../../model/index')

const logoutUser = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.status(204).send()
}

module.exports = {
  logoutUser,
}
