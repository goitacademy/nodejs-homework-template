const validation = (schema) => (req, _, next) => {
  const { error } = schema.validate(req.body)
  if (error) {
    error.status = 400
    next(error)
  }
  next()
}

module.exports = validation
