const { User } = require('../../models')
const sendSuccessResponse = require('../../helpers')

const logout = async(req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  sendSuccessResponse(res, 'Success logout', 200)
}

module.exports = {
  logout
}
