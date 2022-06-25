const { HTTP_CODES, STATUS } = require('../../helpers/constants')

const { userServices } = require('../../services')

const subscription = async (req, res, next) => {
  try {
    const { body } = req
    const userID = req.user.id
    

     if (body.subscription === undefined) {
      return next({
        status: HTTP_CODES.BAD_REQUEST,
        code: HTTP_CODES.BAD_REQUEST,
        message: 'missing field subscription',
      })
    }
    const data = await userServices.subscription(userID, body)
    return data
      ? res.status(HTTP_CODES.OK).json({
        status: STATUS.SUCCESS,
        code: HTTP_CODES.OK,
        data: {
          user: {
            email: data.email,
            subscription: data.subscription,
          },
        },
      })
      : next({
        status: HTTP_CODES.NOT_FOUND,
        code: HTTP_CODES.NOT_FOUND,
        message: 'Not found',
      })

        } catch (error) {
    next(error)
  }
}
  
module.exports = subscription