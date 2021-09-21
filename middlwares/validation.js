const { isEmpty } = require('../utils')

const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body)
    const err = isEmpty(req.body)
      ? 'missing fields: '
      : 'missing required field: '

    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,

        message: err + error.message,
      })
      return
    }
    next()
  }
}

module.exports = validation
