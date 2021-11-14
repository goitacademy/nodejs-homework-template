const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')

const { User } = require('../../models')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong')
  }
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'success',
    code: 200,
    body: {
      user: {
        token,
        email,
        subscription: subscription,
      },
    },
  })
}
module.exports = login
