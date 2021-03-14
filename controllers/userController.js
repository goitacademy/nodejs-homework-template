const { HttpCode } = require('../helpers/constants')

const getCurrentUser = async (request, response, next) => {
  try {
    const user = request.user
    if (!user) {
      response.status(HttpCode.UNATHORIZED).json({
        status: HttpCode.UNATHORIZED,
        code: HttpCode.UNATHORIZED,
        data: { message: 'Not authorized' },
      })
    }
    response.status(HttpCode.OK).json({
      status: HttpCode.OK,
      code: HttpCode.OK,
      data: {
        email: user.email,
        subscription: user.subscription,
        avatar: user.avatarURL,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCurrentUser,
}
