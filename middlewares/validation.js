const { BadRequest } = require('http-errors')

const validation = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body)
  if (error) {
    const newError = new BadRequest(error.message)
    next(newError)
  }
  next()
}

module.exports = validation
