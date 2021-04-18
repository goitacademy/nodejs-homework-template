const Joi = require('joi');

const schemaAddContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
}) 

const schemaUpdateContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .optional(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
}).or('name', 'email') 

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        return next()
    }
    catch (err) { 
        next({status: 400, message: err.message })
    }
}

module.exports = {
    validatorAddContact: async (req, res, next) => {
        return await validate(schemaAddContact, req.body, next)
    },  
    validatorUpdateContact: async (req, res, next) => {
        return await validate(schemaUpdateContact, req.body, next)
    }
}