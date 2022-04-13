const { User } = require('../../models')

const getCurrentUser = async (req, res, next) => {
  try {
    const { _id } = req.user
    const currentUser = await User.findById(_id, {
      _id: 0,
      password: 0,
      token: 0,
    })
    if (!currentUser) {
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
      })
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      result: currentUser,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getCurrentUser
