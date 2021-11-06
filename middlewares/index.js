const Joi = require('joi')

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(20).required(),
      email: Joi.string().email().required(),
      phone: Joi.number().max(10).required(),
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }
    next()
  },
}
