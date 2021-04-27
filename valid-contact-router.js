const Joi = require('joi')
const mongoose = require('mongoose');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
}).or('name', 'phone', 'email', /* 'favorite' */)
  
const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
  favorite:Joi.boolean().optional()
}).or('name', 'phone', 'email', 'favorite')
    
const validate = async (schema, obj, next) => {
  try {
    console.log({obj});
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    if (!obj.favorite) {
    next({ status: 400, message: `missing field favorite` })
    }
    console.log("🚀 ~ file: valid-contact-router.js ~ line 23 ~ validate ~ err", err)
    next({ status: 400, message: err.message.replace(/"/g, "'" ) })
  }
}


module.exports = {
  validationCreateContact: async (req, res, next) => { return await validate(schemaCreateContact, req.body, next) },
  validationUpdateContact: async (req, res, next) => { return await validate(schemaUpdateContact, req.body, next) },
  
  validationObjectId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({ status: 400, message: 'Invalid Obect Id' })
    }
  next()
  }
}