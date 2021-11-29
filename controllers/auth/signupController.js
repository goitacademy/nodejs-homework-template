const {
  signup
} = require('../../model/auth')
const { sendMail } = require('../../helpers/sendMail')

const signupController = async (req, res) => {
  const { email, password } = req.body
  const newUser = await signup(email, password)
  await sendMail(email, newUser.verificationToken)

  res.status(201).json({ newUser })
}

module.exports = {
  signupController
}
