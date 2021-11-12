const bcrypt = require('bcryptjs')
const { Conflict } = require('http-errors')

const { User } = require('../../models')

const signup = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
    // return res.status(409).json({
    //   status: 'error',
    //   code: 409,
    //   message: 'Email in use'
    // })
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const result = await User.create({ email, password: hashPassword })
  res.status(201).json({
    status: 'succes',
    code: 201,
    user: {
      email: result.email,
      subscription: result.subscription
    }
  })
}

module.exports = signup
