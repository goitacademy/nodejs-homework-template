const Joi = require('joi')
const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
})
const generateId = (contacts) => {
  return contacts.length > 0 ? (contacts[contacts.length - 1].id + 1) : 1
}

module.exports = {
  schema,
  generateId
}
