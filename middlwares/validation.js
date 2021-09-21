const { sendBadRequest } = require('../utils')

const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      sendBadRequest(req, res, error)
      return
    }
    next()
  }
}

module.exports = validation
