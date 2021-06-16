const Joi = require('joi')

function notifyIfError(validationResult, res, next) {
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details[0].message })
  }
  next()
}

module.exports = {
  postContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      phone: Joi.string()
        .min(5)
        .max(15)
        .required()
    })
    const validationResult = schema.validate(req.body)
    notifyIfError(validationResult, res, next)
  },

  patchContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .optional(),
      email: Joi.string()
        .email()
        .optional(),
      phone: Joi.string()
        .min(5)
        .max(15)
        .optional()
    })
    const validationResult = schema.validate(req.body)
    notifyIfError(validationResult, res, next)
  }
}
