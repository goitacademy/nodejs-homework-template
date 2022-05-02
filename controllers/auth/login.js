const { User } = require('../../models')
const { Unauthorized } = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw new Unauthorized('Email is wrong')
  }
  const passwordCompare = bcrypt.compareSync(password, user.password)
  if (!passwordCompare) {
    throw new Unauthorized('Password is wrong')
  }
  if (!user.verify) {
    throw new Unauthorized('Not verify')
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  })
}

module.exports = login
