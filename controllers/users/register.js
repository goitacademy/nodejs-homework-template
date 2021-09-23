const { Conflict } = require('http-errors')

const { sendMail } = require('../../utils')
const { User } = require('../../models')

const register = async (req, res,) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Already register')
  }

  const newUser = new User({ email })
  newUser.createVerificationToken()
  newUser.setPassword(password)

  await newUser.save()

  const { verificationToken } = newUser
  console.log('email:', email)
  console.log('verificationToken:', verificationToken)
  const data = {
    to: email,
    subject: 'Registration confirmation',
    html: `<a href="http://localhost:3000/api/v1/users/verify/${verificationToken}">Please confirm your registration</a>`,
  }

  await sendMail(data)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register',
  })
}

module.exports = register
