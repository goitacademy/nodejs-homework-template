const { Unauthorized } = require('http-errors')
const { User } = require('../../model/schemas/userModel')

const current = async (req, res, next) => {
  try {
    const { _id, email, subscription } = req.user
    const currentUser = await User.findById(_id)
    if (!currentUser) {
      throw new Unauthorized('Not authorized')
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        email,
        subscription
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = current
