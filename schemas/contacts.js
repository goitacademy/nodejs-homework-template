const Joi = require("joi")

const addContactsSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'any.required': `missing required {{#label}} field`
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'any.required': `missing required {{#label}} field`
        }),
    phone: Joi.string()
        .min(3)
        .max(20)
        .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){3,14}(\s*)?$/)
        .required()
        .messages({
            'any.required': `missing required {{#label}} field`
        }),
})

const updateContactsSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30),
    email: Joi.string()
        .email(),
    phone: Joi.string()
        .min(3)
        .max(20)
        .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){3,14}(\s*)?$/)
}).min(1)
    .messages({
        'object.min': "missing fields"
    })

module.exports = {
    addContactsSchema,
    updateContactsSchema
}
