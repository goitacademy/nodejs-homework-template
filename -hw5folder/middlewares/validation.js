const validation = (schema) => {
  const validFunc = (req, res, next) => {
    // ф-ція робочих запитів
    const { error } = schema.validate(req.body) // req.body - тіло запиту
    if (error) {
      return res.status(400).json({
        message: error.message,
      })
    }
    next()
  }

  return validFunc
}
module.exports = validation
