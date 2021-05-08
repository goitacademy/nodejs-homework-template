const Joi = require("joi");

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    age: Joi.number()
        .integer()
        .min(1)
        .max(30),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

const schemaUpdateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .optional(),

    age: Joi.number()
        .integer()
        .min(1)
        .max(30)
        .optional(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .optional()
})

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        return next()
}
    catch (err) {
        next({status:400,message: err.message})
 }
}

module.exports = {
    validCreateContact:async (req, res, next) => {
        return await validate(schemaCreateContact, req.body, next)
    },
    validUpdateContact:async (req, res, next) => {
        return await validate(schemaUpdateContact, req.body, next)
    }
}
