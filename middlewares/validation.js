const validation = (schema) => {
  return validationFn = async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.message
      })
    }
    next()
  }
}

module.exports = validation