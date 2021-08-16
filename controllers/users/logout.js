const { user: service } = require('../../services')

const logout = async (req, res, next) => {
  try {
    await service.updateById(req.user._id, { token: null })
    res.status(204).json({
      status: 'success',
      code: 204,
      message: 'No Content'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = logout
