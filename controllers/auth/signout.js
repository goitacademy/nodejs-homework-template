const { User } = require('../../model')

const signout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null })
    res.status(204).json({
      status: 'success',
      code: 204,
      message: 'Success logout'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signout