const { HTTP_CODES, STATUS, OPERATION_STATUS } = require('../../helpers/constants')

const { authServices, userServices } = require('../../services')

const login = async (req, res, next) => {
  try {
    const { password, email } = req.body
    const token = await authServices.login({
      password,
      email,
    })
   switch (token) {
      case OPERATION_STATUS.WRONG_CREDENTIAL:
      case OPERATION_STATUS.USER_NOT_FOUND:
        return next({
          status: HTTP_CODES.UNAUTHORIZED,
          code: HTTP_CODES.UNAUTHORIZED,
          message: 'Email or password is wrong',
        })
      case OPERATION_STATUS.NEED_VERIFICATION:
        return next({
          status: HTTP_CODES.NOT_FOUND,
          code: HTTP_CODES.NOT_FOUND,
          message: 'User not found.',
        })
      default:
        break
    }

    if (token) {
      const user = await userServices.findUserByEmail(email)
      return res.status(HTTP_CODES.OK).json({
        status: STATUS.SUCCESS,
        code: HTTP_CODES.OK,
        data: {
          token,
          user: {
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL,
          },
        },
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = login