const { Conflict } = require('http-errors')
const { User } = require('../../models')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const { sendEmail } = require('../../helpers')

const register = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const avatarURL = gravatar.url(email)
  const verifyToken = nanoid()
  const newUser = new User({ email, avatarURL, verifyToken })

  newUser.setPassword(password)
  await newUser.save()

  const registrationEmail = {
    to: email,
    subject: 'Registration confirmation',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verifyToken}">Click to verify your email</a>`
  }

  sendEmail(registrationEmail)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
    user: {
      email,
      subscription: 'starter',
    },
  })
}

module.exports = register
