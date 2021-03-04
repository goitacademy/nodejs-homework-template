const Joi = require('joi')

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
  phone: Joi.number().integer().required(),
  subscription: Joi.string().optional(),
  password: Joi.string().alphanum().min(2).max(30).optional()
})

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
  phone: Joi.number().integer().min(2).max(13).optional(),
  subscription: Joi.string().optional(),
  password: Joi.string().alphanum().min(2).max(30).optional()
})

const findAndDeleteContactSchema = Joi.string().alphanum().required()

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`
    })
  }
  next()
}

const addContactValidation = (req, res, next) => {
  return validate(addContactSchema, req.body, next)
}

const findContactByIdValidation = (req, res, next) => {
  return validate(findAndDeleteContactSchema, req.params.contactId, next)
}

const updateContactValidation = (req, res, next) => {
  return validate(updateContactSchema, req.body, next)
}

const deleteContactValidation = (req, res, next) => {
  return validate(findAndDeleteContactSchema, req.params.contactId, next)
}

module.exports = {
  addContactValidation,
  findContactByIdValidation,
  updateContactValidation,
  deleteContactValidation
}
