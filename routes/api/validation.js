const Joi = require('joi')

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['ua', 'gmail', 'com', 'net', 'org'] }
    })
    .required(),
  phone: Joi.string()
    .pattern(/[()][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .required()
})

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['ua', 'gmail', 'com', 'net', 'org'] }
    })
    .optional(),
  phone: Joi.string()
    .pattern(/[()][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .optional()
}).or('name', 'email', 'phone')

module.exports = {
  addContactSchema,
  updateContactSchema
}
