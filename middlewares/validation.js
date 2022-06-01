const Joi = require('joi')

const schemaAddContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ru', 'ua'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/)
    .required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ru', 'ua'] }
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/)
    .optional(),
}).min(1)

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required()
})

const validate = (schema, res, obj, next) => {
  const validationData = schema.validate(obj)

  if (validationData.error) {
    return res.status(400)
      .json({ message: validationData.error.message.replace(/"/g, '') })
  }

  next()
}

module.exports = {
  validationAddContact: (req, res, next) => {
    return validate(schemaAddContact, res, req.body, next)
  },

  validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, res, req.body, next)
  },

  validationUpdateStatusContact: (req, res, next) => {
    return validate(schemaUpdateStatusContact, res, req.body, next)
  }
}
