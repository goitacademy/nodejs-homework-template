const checkValidity = (schema) => {
  const validateData = async (req, res, next) => {
    try {
      await schema.validateAsync(req.body)
    } catch (err) {
      return res.status(400).json({ status: err.details })
    }
    next()
  }
  return validateData
}

module.exports = checkValidity
