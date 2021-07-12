const { users: service } = require('../../services')

const register = async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { email, password } = req.body
  try {
    const user = await service.getOne({ email })
    if (user) {
      res.status(409).json({
        status: 'success',
        code: 409,
        message: 'Already register',
      })
      return
    }
    const newUser = await service.add(req.body)
    const { password, ...result } = newUser
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Success create',
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = register
