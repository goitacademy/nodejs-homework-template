const { User } = require('../../models')
const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const uuid = require('uuid')
const { sendEmail } = require('../../helpers')

const signup = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with ${email} already exist`)
  }
  const verificationToken = uuid.v4()
  const avatarURL = gravatar.url(email)
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  })

  const mail = {
    to: email,
    subject: 'Підтвердіть email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Підтвердити email</a>`,
  }

  await sendEmail(mail)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  })
}

module.exports = signup
