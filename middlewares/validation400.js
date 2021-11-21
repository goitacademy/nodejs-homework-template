const CreateError = require('http-errors')

const validation400 = (schema) => {
  const validationMiddleware = (req, _, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      const newError = new CreateError(400, error.message)
      next(newError)
    }
    next()
  }
  return validationMiddleware
}

module.exports = validation400
