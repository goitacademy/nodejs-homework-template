const { BadRequest } = require('http-errors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User } = require('../../model')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Wrong login or password')
  }
  const payload = {
    _id: user.id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  })
}

module.exports = login
