const { User } = require('../../models')

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      res.status(409).json({
        status: `User with email=${email} already exist`,
        code: 409
      })
    }
    const newUser = new User({ email })
    newUser.setPassword(password)
    newUser.save()
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'register success'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = register
