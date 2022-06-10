const { HTTP_CODES, STATUS } = require('../../helpers/constants')

const { authServices, userServices } = require('../../services')

const login = async (req, res, next) => {
  try {
    const { password, email } = req.body
    const token = await authServices.login({
      password,
      email,
    })
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
          },
        },
      })
    }
    next({
      status: HTTP_CODES.UNAUTHORIZED,
      code: HTTP_CODES.UNAUTHORIZED,
      message: 'Email or password is wrong',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login