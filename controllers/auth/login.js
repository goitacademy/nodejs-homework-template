const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')

const { User } = require('../../models')

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    throw new Unauthorized('Email or password is wrong')
    // return res.status(401).json({
    //   status: 'error',
    //   code: 401,
    //   message: 'Email or password is wrong'
    // })
  }

  const hashPassword = user.password
  const compareResult = bcrypt.compareSync(password, hashPassword)

  if (!compareResult) {
    throw new Unauthorized('Email or password is wrong')
  }

  const payload = { id: user._id }
  const { SECRET_KEY } = process.env
  const token = jwt.sign(payload, SECRET_KEY)

  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription
    }
  })
}

module.exports = login
