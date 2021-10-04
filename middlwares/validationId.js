const { BadRequest } = require('http-errors')
const { contactIdSchema } = require('../joiSchemas')

const validationId = () => {
  return async (req, res, next) => {
    const { error } = contactIdSchema.validate(req.params)
    if (error) {
      next(new BadRequest(error.message))
      return
    }
    next()
  }
}

module.exports = validationId
