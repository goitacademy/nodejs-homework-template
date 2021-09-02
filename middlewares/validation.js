const validation = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body)
  if (error) {
    res.status(400).json({
      message: error.message
    })
  }
  next()
}

module.exports = validation
