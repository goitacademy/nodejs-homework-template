const Joi = require('joi');

const schemaAddContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
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
    
    phone: Joi.string().pattern(/^[\d\(\)\ -]{4,14}\d$/).optional() 
}).or('name', 'email', 'phone')

const schemaUpdatePhoneContact = Joi.object({
    phone: Joi.string().pattern(/^[\d\(\)\ -]{4,14}\d$/).required()
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
     validateUpdatePhoneContact: async (req, res, next) => {
        return await validate(schemaUpdatePhoneContact, req.body, next)
    },
    validateUpdateContact: async (req, res, next) => {
        return await validate(schemaUpdateContact, req.body, next)
    }
}