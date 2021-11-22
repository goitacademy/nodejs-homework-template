const { UserModel } = require('../../db/userModel')

const signoutController = async (req, res) => {
  const { _id } = req.user
  await UserModel.findByIdAndUpdate(_id, { token: null })
  res.status(204).json({ message: 'no content' })
}

module.exports = {
  signoutController
}
