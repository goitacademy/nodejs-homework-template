const Joi = require('joi')


const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.number().integer().min(7).max(12).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
})
  
const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  phone: Joi.number().integer().min(7).max(12).optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
})
  // .or('name', 'phone', 'email')
    
const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    // console.log("🚀 ~ file: valid-contact-router.js ~ line 23 ~ validate ~ err", err)
    next({ status: 400, message: err.message.replace(/"/g, "'" ) })
  }
}

// const  validationCreateContact = async (req, res, next) => { return await validate(schemaCreateContac, req.body, next) }
// const  validationUpdateContact = async (req, res, next) => { return await validate(schemaUpdateContact, req.params.id, req.body, next) }

// module.exports = {
//   validationCreateContact,
//   validationUpdateContact
// }


module.exports = {
  validationCreateContact: async (req, res, next) => { return await validate(schemaCreateContact, req.body, next) },
  validationUpdateContact: async (req, res, next) => { return await validate(schemaUpdateContact, req.body, next) }
}
