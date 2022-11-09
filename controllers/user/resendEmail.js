const { User } = require('../../models/user')

const { RequestError, sendEmail } = require('../../helpers')

const { BASE_URL } = process.env

const resendEmail = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user || user.verify) {
    throw RequestError(404)
  }
  if (user.verify) {
    res.json({
      message: 'Verification has already been passed',
    })
  }

  const mail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify you email</a>`,
  }
  await sendEmail(mail)

  res.json({
    message: 'Verification email sent',
  })
}

module.exports = resendEmail
