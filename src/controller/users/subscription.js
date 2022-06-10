const { HTTP_CODES, STATUS } = require('../../helpers/constants')

const { userServices } = require('../../services')

const subscription = async (req, res, next) => {
  try {
    const userID = req.user.id
    const user = await userServices.updateUserSubscription(userID, req.body)

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
  } catch (error) {
    next(error)
  }
}

module.exports = subscription