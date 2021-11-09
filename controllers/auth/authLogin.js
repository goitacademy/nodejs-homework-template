const { loginUser } = require('../../model/auth')

const authLogin = async (req, res, next) => {
  try {
    const data = await loginUser(req.body)
    console.log(data)
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
  } catch (error) {
    console.log(error)
  }
}

module.exports = authLogin
