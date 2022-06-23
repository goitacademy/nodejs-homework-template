const {
  HTTP_CODES,
  STATUS,
  OPERATION_STATUS,
} = require('../../helpers/constants')

const { userServices } = require('../../services')

const verifyUserOneMoreTime = async (req, res, next) => {
  const { email } = req.body
  try {
    const answer = await userServices.verifyUserOneMoreTime(email)

    switch (answer) {
      case OPERATION_STATUS.SUCCESS:
        return res.status(HTTP_CODES.OK).json({
          status: STATUS.SUCCESS,
          code: HTTP_CODES.OK,
          data: {
            message: 'Verification email sent',
          },
        })
      case OPERATION_STATUS.ERROR:
        return next({
          status: HTTP_CODES.BAD_REQUEST,
          code: HTTP_CODES.BAD_REQUEST,
          message: 'Verification has already been passed',
        })
      case OPERATION_STATUS.FAIL:
        return next({
          status: HTTP_CODES.BAD_REQUEST,
          code: HTTP_CODES.BAD_REQUEST,
          message: 'User not found',
        })

      default:
        break
    }
  } catch (error) {
    next(error)
  }
}

module.exports = verifyUserOneMoreTime