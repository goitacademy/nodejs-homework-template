const { Conflict } = require('http-errors')

const { User } = require('../../model')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email is already busy, please think of another')
  }

  const newUser = new User({ email })
  newUser.setPassword(password)
  await newUser.save()

  res.status(201).json({ newUser })
}

module.exports = register
