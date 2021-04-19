const Joi = require('joi');

const validAddContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
});
const validUpdateContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .optional(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).optional(),
}).or('name', 'email', 'phone');
const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        return next()
    } catch (err) {
        console.log(err)
        next({ status: 400, message: err.message })
    }
};
module.exports = {
    validAddContact: async (req, res, next) => {
        return await validate(validAddContact, req.body, next)
    },
    validUpdateContact: async (req, res, next) => {
        return await validate(validUpdateContact, req.body, next)
    }
};