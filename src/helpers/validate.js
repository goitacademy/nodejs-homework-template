const { HTTP_CODES } = require('./constants.js')

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (error) {
    next({
      status: HTTP_CODES.BAD_REQUEST,
      message: error.message.replace(/"/g, ''),
    })
  }
}

module.exports = validate