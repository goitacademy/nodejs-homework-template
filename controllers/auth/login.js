const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')

const { User } = require('../../model')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw new Unauthorized('Invalid email/password')
  }

  const compareResult = user.comparePassword(password)

  if (!compareResult) {
    throw new Unauthorized('Invalid email/password')
  }

  const payload = { id: user._id }

  const { SECRET_KEY } = process.env

  const token = jwt.sign(payload, SECRET_KEY)

  const loggedUser = await User.findByIdAndUpdate(user._id, { token }, { new: true })
  res.json({ token, loggedUser })
}

module.exports = login
