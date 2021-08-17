const { User } = require('.././db/user')
const { code, sub } = require('.././template/http-code-template')
const { signup, login, logout, current } = require('.././sevices/authService')

const signupController = async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return next({
      status: code.CONFLICT,
      data: 'Conflict',
      message: 'Email in use',
    })
  }
  try {
    const newUser = await signup(req.body)
    return res.status(code.CREATED).json({
      status: 'Created',
      user: {
        email: newUser.email,
        subscription: sub.STARTER,
      },
    })
  } catch (error) {
    next(error)
  }
}

const loginController = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const newUser = await login(email, password)

    res.status(code.OK).json({
      status: 'Success',
      token: newUser.token,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

const logoutController = async (req, res, next) => {
  try {
    const id = req.user.id
    await logout(id)
    res.status(code.OK).json({
      status: 'Success',
    })
  } catch (error) {
    next(error)
  }
}

const currentController = async (req, res, next) => {
  try {
    const id = req.user.id
    const user = await current(id)
    res.status(code.OK).json({
      status: 'Success',
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signupController,
  loginController,
  logoutController,
  currentController,
}