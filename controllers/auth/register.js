const { sendSuccessRes } = require('../../helpers')
const bcrypt = require('bcrypt')
const { User } = require('../../models')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    res.status(409).json({
      ststus: 'error',
      code: 409,
      message: 'Already register',
    })
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const newUser = { email, password: hashPassword }
  const result = await User.create(newUser)

  sendSuccessRes(res, { result })
}

module.exports = register
