const { HTTP_CODES, STATUS } = require('../../helpers/constants')

const { authServices } = require('../../services')

const logout = async (req, res, next) => {
  try {
    const id = req.user.id
    await authServices.logout(id)
    return res.status(HTTP_CODES.NO_CONTENT).json({
      status: STATUS.SUCCESS,
      code: HTTP_CODES.NO_CONTENT,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = logout