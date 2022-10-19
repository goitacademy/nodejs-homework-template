const { basedir } = global

const { User, schemas } = require(`${basedir}/models/user`)

const {
  createError,
  emailSender,
  verificationLetter,
} = require(`${basedir}/helpers`)

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body
  const { error } = schemas.email.validate({ email })
  if (error) {
    throw createError(400, error.message)
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw createError(404)
  }
  if (user.verify) {
    throw createError(400, 'Verification has already been passed')
  }

  await emailSender(verificationLetter(email, user.verificationToken))
  res.json({
    message: 'Verification email sent',
  })
}

module.exports = resendVerifyEmail