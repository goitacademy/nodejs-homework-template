const { Conflict } = require('http-errors')

const { User } = require('../../models')

const registration = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict(`Email ${email} in use`)
  }

  const newUser = new User({ email })
  newUser.setPassword(password)
  await newUser.save()

  res.status(201).json({
    status: 'created',
    code: 201,
    message: 'Register success',
    body: {
      user: {
        email,
        password,
      },
    },
  })
}

module.exports = registration
