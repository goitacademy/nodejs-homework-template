const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({
    message: "Ошибка от Joi или другой библиотеки валидации"
      })
    }
    next()
  }
}

module.exports = validation