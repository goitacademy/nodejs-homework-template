const Joi = require('joi')

const schemaAddContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    phone: Joi.string()
        .min(7)
        .max(18)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})
const schemaUpdateContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .optional(),

    phone: Joi.string()
        .min(7)
        .max(18)
        .optional(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional()
})


const validation = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj);
        return next()
}
    catch (err) {
        console.log(err);
        next({
            status: 400,
            message: err.message
        })
 }
}

module.exports = {
    validationAddContact: async (req, res, next) => {
        return await validation(schemaAddContact, req.body, next)
    },
    validationUpdateContact: async (req, res, next) => {
        return await validation(schemaUpdateContact, req.body, next)
    }
}