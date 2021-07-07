const Joi = require('joi')
const { ValidationError } = require('../helpers/errors')
const mongoose = require('mongoose')

module.exports = {
  contactValidation: function (req, res, next) {
    let schema = null
    if (req.method === 'POST') {
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
        owner: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'user',
        },
      })
    } else if (req.method === 'PATCH') {
      schema = Joi.object({
        name: Joi.string().min(3).max(30),
        phone: Joi.string().length(11),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        }),
        favorite: Joi.boolean(),
        owner: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'user',
        },
      }).min(1)
    }

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      next(new ValidationError(JSON.stringify(validationResult.error.details)))
    }
    next()
  },
}
