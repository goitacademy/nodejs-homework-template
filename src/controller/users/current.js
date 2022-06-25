const { HTTP_CODES, STATUS } = require('../../helpers/constants')

const { userServices } = require('../../services')

const current = async (req, res, next) => {
  try {
    const userID = req.user.id
    const user = await userServices.findUserById(userID)

    if (user) {
      return res.status(HTTP_CODES.OK).json({
        status: STATUS.SUCCESS,
        code: HTTP_CODES.OK,
        data: {
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
      message: 'Not authorized',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = current