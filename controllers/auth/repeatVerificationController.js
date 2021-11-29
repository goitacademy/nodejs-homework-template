const { UserModel } = require('../../db/userModel')
const { BadRequest } = require('http-errors')
const { sendMail } = require('../../helpers/sendMail')

const repeatVerificationController = async (req, res) => {
  const { email } = req.body
  const user = await UserModel.findOne({ email })

  if (user.verify) {
    throw new BadRequest('User*s email has already been verified')
  }
  const verificationToken = user.verificationToken
  await sendMail(email, verificationToken)
  res.status(200).json({ message: 'Verification email sent' })
}
module.exports = {
  repeatVerificationController
}
