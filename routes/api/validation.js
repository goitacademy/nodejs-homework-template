const Joi = require('joi');

const schemaContactCreate = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().min(3).max(30).required(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
})

const schemaContactUpdate = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    email: Joi.string()
        .email()
        .min(3)
        .max(30)
        .optional(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .optional(),
})

const validate = (schema, obj, next) => {
    const { error } = schema.validate(obj)
    if (error) {
        const [{ message }] = error.details
        return next({
            status: 400,
            message: `Filed: ${message.replace(/"/g, '')}`,
        })
    }
    next()
}

module.exports.createContact = async (req, res, next) => {
    return await validate(schemaContactCreate, req.body, res, next)
}

module.exports.updateContact = (req, res, next) => {
    return validate(schemaContactUpdate, req.body, next)
}