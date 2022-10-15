const bcrypt = require('bcryptjs')

const gravatar = require('gravatar')

const { basedir } = global

const { User, schemas } = require(`${basedir}/models/user`)

const { createError } = require(`${basedir}/helpers`)

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body)
  if (error) {
    throw createError({ status: 400, message: error.message })
  }
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw createError({ status: 409, message: `${email} is already exist` })
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email)

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  })
  res.status(201).json({
    name: result.username,
    email: result.email,
    subscription: result.subscription,
  })
}

module.exports = register