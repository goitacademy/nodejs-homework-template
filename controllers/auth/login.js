const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { basedir } = global

const { User, schemas } = require(`${basedir}/models/user`)

const { createError } = require(`${basedir}/helpers`)

const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { error } = schemas.login.validate(req.body)

  if (error) {
    throw createError({ status: 400, message: error.message })
  }

  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw createError({ status: 401, message: 'Email wrong' })
  }

  if (!user.verify) {
    throw createError({ status: 401, message: 'Email is not verified' })
  }

  const comparePassword = await bcrypt.compare(password, user.password)

  if (!comparePassword) {
    throw createError({ status: 401, message: 'Password wrong' })
  }
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    token,
  })
}

module.exports = login