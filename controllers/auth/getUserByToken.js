const { User } = require('../../models/user')

const getUserByToken = async (req, res, next) => {
  const { token } = req.user
  console.log('token :>> ', token)
  const user = await User.findOne({ token })
  console.log('user :>> ', user)
  if (!user) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized'
    })
  }
  const { email, subscription } = user
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      email,
      subscription
    }
  })
}

module.exports = getUserByToken
