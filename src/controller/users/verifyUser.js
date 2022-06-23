const { HTTP_CODES, STATUS } = require('../../helpers/constants')

const { userServices } = require('../../services')

const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params
  try {
    const answer = await userServices.verifyUser(verificationToken)
    if (answer) {
      return res.status(HTTP_CODES.OK).json({
        status: STATUS.SUCCESS,
        code: HTTP_CODES.OK,
        data: {
          message: 'Verification successful',
        },
      })
    }
    return next({
      status: HTTP_CODES.NOT_FOUND,
      code: HTTP_CODES.NOT_FOUND,
      message: 'User not found',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = verifyUser