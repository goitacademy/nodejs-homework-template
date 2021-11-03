const { NotFound } = require('http-errors')
const { User } = require('../../models/user')
const { sendEmail } = require('../../helpers')

const repeatVerify = async(req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw NotFound()
  }
  if (user.verify) {
    res.json({
      status: 'error',
      code: 400,
      message: 'Verification has already been passed'
    })
  }

  const registrationEmail = {
    to: email,
    subject: 'Registration confirmation',
    html: `
        <a target="_blank" 
            href="http://localhost:3000/api/users/verify/${user.verifyToken}">Click to verify your email</a>
        `
  }

  sendEmail(registrationEmail)

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent'
  })
}

module.exports = repeatVerify
