const Joi = require('joi')
const mongoose = require('mongoose');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
}).or('name', 'phone', 'email')
  
const schemaQueryContact = Joi.object({
  sortBy: Joi.string().valid('name', 'phone', 'email').optional(),
  sortByDesc: Joi.string().valid('name', 'phone', 'email').optional(),
  filter: Joi.string().optional(),
  limit: Joi.number().integer().min(1).max(20).optional(),
  offset: Joi.number().integer().min(0).optional(),
  isFavorite:Joi.boolean().optional(),
}).without('sorBy', 'sortByDesc')


const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
  isFavorite:Joi.boolean().optional()
}).or('name', 'phone', 'email', 'isFavorite')
    
const schemaUpdateStatusContact = Joi.object({
  isFavorite:Joi.boolean().required()
})


const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    
    next({ status: 400, message: err.message.replace(/"/g, "'" ) })
  }
}


module.exports = {
  validationCreateContact: async (req, res, next) => { return await validate(schemaCreateContact, req.body, next) },
  validationQueryContact: async (req, res, next) => { return await validate(schemaQueryContact, req.query, next) },
  validationUpdateContact: async (req, res, next) => { return await validate(schemaUpdateContact, req.body, next) },
  validationUpdateStatusContact: async (req, res, next) => { return await validate(schemaUpdateStatusContact, req.body, next) },
  
  validationObjectId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({ status: 400, message: 'Invalid Obect Id' })
    }
  next()
  }
}