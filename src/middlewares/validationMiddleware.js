const Joi = require('joi')
const { ValidationError } = require('../helpers/errors')

function notifyIfError(validationResult, next) {
  if (validationResult.error) {
   next(new ValidationError(validationResult.error.details[0].message))
  }
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
        .required(),
      favorite: Joi.boolean()
        .optional()
      .default(false)
    })
    const validationResult = schema.validate(req.body)
    notifyIfError(validationResult, next)
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
        .optional(),
      favorite: Joi.boolean()
        .optional()
      .default(false)
    })
    const validationResult = schema.validate(req.body)
    notifyIfError(validationResult, next)
  }
}
