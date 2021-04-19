const Joi = require('joi');

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    
    phone: Joi.string().length(14).optional(),
})

const schemaUpdateContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .optional(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .optional(),
    
    phone: Joi.string().length(14).optional(),
}).or('name', 'email', 'phone')

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        return next()
    } catch (err) {
        next({status: 400, message: err.message.replace(/"/g,"'")})
    }   
}

module.exports = {
    validationCreateContact: async (req, res, next) => {
        return await validate(schemaCreateContact, req.body, next)
    },
    validationUpdateContact: async (req, res, next) => {
        return await validate(schemaUpdateContact, req.body, next)
    }
}