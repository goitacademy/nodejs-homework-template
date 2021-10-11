const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Ошибка от Joi или другой библиотеки  валидации',
      })
      return
    }
    next()
  }
}

module.exports = validation
