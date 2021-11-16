const Joi = require('joi')

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z0-9,. ]*$/).min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net']
      }
    }).required(),
    phone: Joi.string().regex(/^[0-9,. -/+]*$/).min(4).max(14).required()
  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details
    })
  }

  next()
}

const updateContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z0-9,. ]*$/).min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net']
      }
    }).required(),
    phone: Joi.string().regex(/^[0-9,. -/+]*$/).min(4).max(14).required()
  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details
    })
  }

  next()
}

const patchContactValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({
      message: 'missing field favorite'
    })
  }

  next()
}

const registrationValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net']
      }
    }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9,. ]*$/).min(3).max(30).required()
  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details
    })
  }

  next()
}

module.exports = {
  addContactValidation,
  updateContactValidation,
  patchContactValidation,
  registrationValidation
}