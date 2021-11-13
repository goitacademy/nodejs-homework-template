const validation = (schema) => {
  const validationMiddleWare = (req, _, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      error.status = 400
      next(error)
    }
    next()
  }

  return validationMiddleWare
}

module.exports = validation
