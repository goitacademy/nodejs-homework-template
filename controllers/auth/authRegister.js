const { registerUser } = require('../../model/auth')

const authRegister = async (req, res, next) => {
  const { email, password, subscription, token } = req.body
  try {
    const data = await registerUser({ email, password, subscription, token })
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
