const Joi = require("joi")

const contactsSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .max(15)
    .required()
})

module.exports = {
  contactsSchema,
}