const { BadRequest } = require('http-errors')

const { isEmpty } = require('../utils')

const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      const err = isEmpty(req.body) ? 'missing fields:  ' : '' + error.message

      return next(new BadRequest(err))
    }
    next()
  }
}

module.exports = validation
