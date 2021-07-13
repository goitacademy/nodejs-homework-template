const { AuthService, UsersService } = require('../services')
const { HttpCode } = require('../helpers/constants')
const serviceUser = new UsersService()
const serviceAuth = new AuthService()

const signup = async (req, res, next) => {
  const { email, password } = req.body
  const user = await serviceUser.findByEmail(email)
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: 'Conflict',
      message: 'This email is already in use',
    })
  }
  try {
    const newUser = await serviceUser.create({ email, password, })
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        avatar: newUser.avatarURL,
      },
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const token = await serviceAuth.login({ email, password })
    if (token) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          token,
        },
      })
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: 'Invalid creadentials',
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  const id = req.user.id
  await serviceAuth.logout(id)
  return res
    .status(HttpCode.NO_CONTENT)
    .json({ status: 'success', code: HttpCode.NO_CONTENT })
}

const current = async (req, res, next) => {
  try {
    const { email, subscription } = req.user

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { email, subscription },
    })
  } catch (error) {
    next(error)
  }
}

const subscription = async (req, res, next) => {
  try {
    const id = req.user.id
    const user = await serviceUser.update(id, req.body)
    const { email, subscription } = user
    if (user) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          email, subscription
        },
      })
    }
  } catch (error) {
    next(error)
  }
}

const avatars = async (req, res, next) => {
  const id = req.user.id
  const pathFile = req.file.path
  const url = await serviceUser.updateAvatar(id, pathFile)
  return res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, avatarUrl: url })
}

const verify = async (req, res, next) => {
  try {
    const result = await serviceUser.verify(req.params)
    if (result) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'Verification successful',
        },
      })
    } else {
      return next({
        status: HttpCode.BAD_REQUEST,
        message:
          'Your verification token is not valid. Contact with administration',
      })
    }
  } catch (error) {
    next(error)
  }
}

const reVerification = async (req, res, next) => {
  try {
    const result = await serviceUser.reVerify(req.body.email)

    if (result) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'verification email sent successfully',
        },
      })
    } else {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'Verification has been passed',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signup,
  login,
  logout,
  current,
  subscription,
  avatars,
  verify,
  reVerification
}
