const { User } = require('../../models')
const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const { sendEmail } = require('../../helpers')

const signup = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with ${email} already exist`)
  }
  const verificationToken = nanoid()
  const avatarURL = gravatar.url(email)
  const hashPasswodr = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const result = await User.create({ email, password: hashPasswodr, subscription, avatarURL, verificationToken })
  const mail = {
    to: email,
    subject: 'Email verification',
    html: `<a target='_blanc' href='http://localhost:3000/api/users/verify/${verificationToken}> Press for verification </a>`
  }

  await sendEmail(mail)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        password,
        subscription,
        avatarURL,
        verificationToken
      }
    }
  })
}

module.exports = signup
