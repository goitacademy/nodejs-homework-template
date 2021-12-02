const { Conflict } = require('http-errors')
const { User } = require('../../models')
const { v4: uuidv4 } = require('uuid')
const { sendMail } = require('../../helpers')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with email=${email} already exist`)
  }

  const verificationToken = uuidv4()
  const newUser = new User({ email, verificationToken })
  newUser.setPassword(password)
  await newUser.save()
  const mail = {
    to: email,
    subject: 'Подтверждение регистрации',
    html: `<a href='http://localhost:3000/api/auth/verify/${verificationToken}'> Нажмите для подтверждения регистрации email</a>`,
  }

  await sendMail(mail)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
  })
}

module.exports = register
