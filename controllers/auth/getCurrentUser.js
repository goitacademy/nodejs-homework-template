const { Unauthorized } = require('http-errors')
const { User } = require('../../model')

const getCurrentUser = async (req, res) => {
  const { _id } = req.user
  const currentUser = await User.findById(_id, {
    _id: 0,
    password: 0,
    token: 0,
  })
  if (!currentUser) {
    throw new Unauthorized('Not authorized')
  }
  res.jon({
    status: 'success',
    code: 200,
    result: currentUser,
  })
}

module.exports = getCurrentUser
