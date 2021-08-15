const Joi = require('joi')

module.exports = {
  validation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      phone: Joi.string()
        .length(10)
        .pattern(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/)
        .required(),
      favorite: Joi.bool().optional(),
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }

    next()
  },

  patchValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).optional(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .optional(),
      phone: Joi.string()
        .length(10)
        .pattern(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/)
        .optional(),
      favorite: Joi.bool().required(),
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }

    next()
  },
}