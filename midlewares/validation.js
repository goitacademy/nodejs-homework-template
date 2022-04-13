const validation = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body)
  if (error) {
    const postError = new Error(error.message)
    postError.status = 400
    return next(postError)
  }
  next()
}

module.exports = validation
