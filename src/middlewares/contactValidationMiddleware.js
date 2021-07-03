const Joi = require('joi')
const { ValidationError } = require('../helpers/errors')

module.exports = {
  contactValidation: function (req, res, next) {
    let schema = null
    if (req.method === 'POST') {
      console.log('Post - request')
      schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        phone: Joi.string().length(11).required(),
        email: Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
          })
          .required(),
        favorite: Joi.boolean().default(false),
      })
    } else if (req.method === 'PATCH') {
      console.log('Patch request')
      schema = Joi.object({
        name: Joi.string().min(3).max(30),
        phone: Joi.string().length(11),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        }),
        favorite: Joi.boolean(),
      })
    }

    const validationResult = schema.validate(req.body)
    console.log(validationResult)
    if (validationResult.error) {
      next(new ValidationError(JSON.stringify(validationResult.error.details)))
    }
    next()
  },
}
