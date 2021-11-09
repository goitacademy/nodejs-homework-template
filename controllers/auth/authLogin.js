const { loginUser } = require('../../model/auth')

const authLogin = async (req, res, next) => {
  const data = await loginUser(req.body)

  if (!data) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Wrong email or password'
    })
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: data
    }
  })
}

module.exports = authLogin
