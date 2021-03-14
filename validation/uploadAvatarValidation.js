const { HttpCode } = require('../helpers/constants')

module.exports.uploadAvatarValidation = (request, response, next) => {
  if (!request.file) {
    return response.status(HttpCode.BAD_REQUEST).json({
      status: 'Error',
      code: HttpCode.BAD_REQUEST,
      message: `Something went wrong width avatar`,
      data: 'Bad request',
    })
  }
  next()
}

module.exports.changeUserAvatarValidation = (request, response, next) => {
  if (!request.file) {
    return response.status(HttpCode.BAD_REQUEST).json({
      status: 'Error',
      code: HttpCode.BAD_REQUEST,
      message: `Not authorized`,
    })
  }
  next()
}
