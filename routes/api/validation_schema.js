const Joi = require('joi')

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['ua', 'gmail', 'com', 'net', 'org'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/[()][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .required(),
})
const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['ua', 'gmail', 'com', 'net', 'org'] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/[()][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .optional(),
}).or('name', 'email', 'phone')

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    next({ status: 400, message: err.message.replace(/"/g, '') })
  }
}

module.exports = {
  validationAddContact: (req, res, next) => {
    return validate(schemaAddContact, req.body, next)
  },
  validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next)
  },
}
