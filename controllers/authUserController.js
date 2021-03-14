const { HttpCode } = require('../helpers/constants')

const authModel = require('../model/authModel')
const userModel = require('../model/userModel')

const registration = async (request, response, next) => {
  const { email, password } = request.body
  const user = await userModel.findUserByEmail(email)
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: 'Conflict',
      message: 'Email in use',
    })
  }
  try {
    const newUser = await userModel.createUser({ email, password })
    return response.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatar: newUser.avatarURL,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

const login = async (request, response, next) => {
  const { email, password } = request.body
  try {
    const result = await authModel.login({
      email,
      password,
    })
    if (result) {
      return response.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          token: result.token,
          user: {
            email: result.userEmail,
            subscription: result.subscription,
          },
        },
      })
    }
    next({
      status: HttpCode.UNATHORIZED,
      message: 'Email or password is wrong',
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (request, response, next) => {
  const userId = request.user.id
  await authModel.logout(userId)
  return response
    .status(HttpCode.NO_CONTENT)
    .json({ status: 'success', code: HttpCode.NO_CONTENT, message: 'Nothing' })
}

module.exports = {
  registration,
  login,
  logout,
}
