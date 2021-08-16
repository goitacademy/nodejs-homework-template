const validate = validator => {
  return async (req, res, next) => {
    const error = await validator(req.body)

    if (error) {
      res.status(400).json({
        status: 'Error',
        code: 400,
        message: error.message,
      })
      return
    }
    next()
  }
}

module.exports = validate
