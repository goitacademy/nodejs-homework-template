const { user: service } = require('../../services')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await service.getOne({ email })

    if (user) {
      return res.status(409).json({
        status: 'Error',
        code: 409,
        message: 'Email is already in use',
        data: 'Conflict',
      })
    }
    const newUser = await service.addUser({ email, password })
    const { subscription } = newUser
    res.status(201).json({
      status: 'Success',
      code: 201,
      data: {
        user: { email, subscription },
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signup
