const Joi = require('joi')
const { HTTP_CODES } = require('../../helpers/contacts')

const schemaAddContact = Joi.object({
  name: Joi.string().min(2).max(25).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['ua', 'com', 'net', 'org'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(25).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['ua', 'com', 'net', 'org'] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .optional(),
}).or('name', 'email', 'phone')

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (error) {
    next({
      status: HTTP_CODES.BAD_REQUEST,
      message: error.message.replace(/"/g, ''),
    })
  }
}

module.exports.validationAddContact = ({ body }, _, next) => {
  return validate(schemaAddContact, body, next)
}

module.exports.validationUpdateContact = ({ body }, _, next) => {
  return validate(schemaUpdateContact, body, next)
}