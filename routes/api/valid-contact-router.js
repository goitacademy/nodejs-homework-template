const Joi = require('joi')
const mongoose = require('mongoose')

const schemaAddContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(/[A-Z]\w+/)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

  phone: Joi.string().pattern(/^[\d\(\)\ -]{4,14}\d$/).required()
})

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),

  phone: Joi.string().pattern(/^[\d\(\)\ -]{4,14}\d$/).optional(),

  favorite: Joi.boolean().optional()
}).or('name', 'email', 'phone', 'favorite')

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required()
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    console.log(err)
    next({ status: 400, message: err.message.replace(/"/g, "'") })
  }
}

module.exports = {
  validateAddContact: async (req, res, next) => {
    return await validate(schemaAddContact, req.body, next)
  },
  validateUpdateStatusContact: async (req, res, next) => {
    return await validate(schemaUpdateStatusContact, req.body, next)
  },
  validateUpdateContact: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next)
  },
  validateObjectId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({ status: 400, message: 'Invalid ObjectId'})
    }
    next()
  },
}
