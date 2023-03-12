const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken')

const { User } = require('../../models')
const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong')
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1d' })

  user.token = token
  user.save()

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    }
  })
}

module.exports = login