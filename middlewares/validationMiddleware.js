const CreateError = require('http-errors')

const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      throw new CreateError(400, 'missing required name field')
    }
    next()
  }
}

module.exports = { validation }