const { User } = require('../../models/user')

const getUserByToken = async (req, res, next) => {
  const { token } = req.user
  console.log('token :>> ', token)
  const user = await User.findOne({ token })
  console.log('user :>> ', user)
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user
    }
  })
}

module.exports = getUserByToken
