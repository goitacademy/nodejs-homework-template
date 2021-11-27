const { NotFound, BadRequest, Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
require('dotenv').config()

const { User } = require('../../models')
const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  // First method
  //   if (!user) {
  //     throw new NotFound(`User with email=${email} not found`)
  //   }

  //   const compareResult = bcrypt.compareSync(password, user.password)
  //   if (!compareResult) {
  //     throw new Unauthorized('Password wrong')
  //   }

  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Wrong email or password')
  }

  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '100h' })
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
