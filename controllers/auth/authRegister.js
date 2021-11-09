const { registerUser } = require('../../model/auth')

const authRegister = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error)
  }
}

module.exports = authRegister
