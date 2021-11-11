const { registerUser } = require('../../model/auth')

const authRegister = async (req, res, next) => {
  const data = await registerUser(req.body)

  if (!data) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Already registered'
    })
  }
  res.json({
    status: 'success',
    code: 201,
    data: {
      result: data
    }
  })
}

module.exports = authRegister
