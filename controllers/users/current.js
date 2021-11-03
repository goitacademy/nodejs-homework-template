const { Unauthorized } = require('http-errors')
const { User } = require('../../models')

const current = async (req, res, next) => {
  try {
    const { _id, email } = req.user
    const currentUser = await User.findById(_id)
    if (!currentUser) {
      throw new Unauthorized('Not authorized')
    }
    res.json({
      status: 'success',
      code: 200,
      user: {
        email,
        subscription: 'starter'
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = current
