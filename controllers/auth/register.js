const { Conflict } = require('http-errors')
const gravatar = require('gravatar')

const { User } = require('../../model')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict(`User with email=${email} allready exist`)
  }
  const avatar = gravatar.url(email)
  const newUser = new User({ email, avatar })

  newUser.setPassword(password)
  await newUser.save()

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
  })
}

module.exports = register
