// проверка содержит ли контакт favotite
const validationFavorite = (schema) => {
  return async (req, res, next) => {
    const { error } = await schema.validate(req.body)
    if (error) {
      req.status(400).json({
        status: 'Error',
        code: 400,
        message: 'missing field favorite',
      })
      return;
    }
    next()
  }
}

module.exports = validationFavorite;
