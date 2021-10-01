const { sendBadRequest } = require('../utils')
const { contactIdSchema } = require('../joiSchemas')

const validationId = () => {
  return async (req, res, next) => {
    const { error } = contactIdSchema.validate(req.params)
    if (error) {
      sendBadRequest(req, res, error)
      return
    }
    next()
  }
}

module.exports = validationId
