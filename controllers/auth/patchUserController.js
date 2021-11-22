const {
  patchUser
} = require('../../model/auth')

const patchUserController = async (req, res) => {
  const { _id } = req.user
  const { subscription } = req.body
  await patchUser(_id, subscription)
  res.status(200).json({ message: 'success' })
}
module.exports = {
  patchUserController
}
