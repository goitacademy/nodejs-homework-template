const validateContactBody = (schema) => {
  return (req, res, next) => {
    const {error} =schema.validate (req.body)
      if(error) {
        return next (res.status(400).json(error.message))
      }
  }
}

module.exports = { validateContactBody };