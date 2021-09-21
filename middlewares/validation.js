const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body)

    if (error) {
      const fieldName = error.details[0].path[0]

      res.status(400).json({
        message: `missing required ${fieldName} field`
      })
      return
    }
    next()
  }
}

module.exports = validation
