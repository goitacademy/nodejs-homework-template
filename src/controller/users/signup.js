const { HTTP_CODES, STATUS } = require('../../helpers/constants')

const { userServices } = require('../../services')

const signup = async (req, res, next) => {
  try {
    const { password, email, subscription } = req.body
    const user = await userServices.findUserByEmail(email)
    if (user) {
      next({
        status: HTTP_CODES.CONFLICT,
        code: HTTP_CODES.CONFLICT,
        data: 'Conflict',
        message: 'Email in use',
      })
    }
    const newUser = await userServices.createUser({
      password,
      email,
      subscription,
    })
    res.status(HTTP_CODES.CREATED).json({
      status: STATUS.SUCCESS,
      code: HTTP_CODES.CREATED,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signup