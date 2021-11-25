const Joi = require('joi')

module.exports = {
  contactValidator: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .required(),
      phone: Joi.string().min(10).max(15).required(),
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }
    next()
  },
}
