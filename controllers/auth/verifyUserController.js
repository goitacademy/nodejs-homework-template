const { UserModel } = require('../../db/userModel')
const { BadRequest } = require('http-errors')

const verifyUserController = async (req, res) => {
  const { verificationToken } = req.params
  const user = await UserModel.findOne({ verificationToken, verify: false })
  if (!user) {
    throw new BadRequest('user was not found or you*ve already verified your email')
  }
  await UserModel.findByIdAndUpdate(user._id, { verificationToken: null, verify: true })

  res.status(200).json({ message: 'Verification successful' })
}

module.exports = {
  verifyUserController
}
