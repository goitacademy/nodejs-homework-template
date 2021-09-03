const bcrypt = require('bcryptjs')

const { User } = require('../../model')

const signup = async (req, res, next) => {
  try {
    const { password, email } = req.body
    const user = await User.findOne({ email })

    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        messsage: 'Already exist'
      })
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const result = await User.create({ email, password: hashPassword })
    res.status(201).json({
      status: 'saccess',
      code: 201,
      messsage: 'Saccess signup'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signup