const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      res.status(400).json({
        status: 'Bad parameters',
        code: 400,
        message: error.message
      })
      return
    }
    next()
  }
}

module.exports = validation
