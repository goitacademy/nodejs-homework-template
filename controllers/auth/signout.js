const { User } = require('../../model')

const signout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null })
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Success logout'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signout