const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required name field`,
        "string.empty": `"name" cannot be empty`,
        "string.base": `"name" must be string`
    }),
    email: Joi.string().email().required().messages({
        "any.required": `missing required name field`,
        "string.empty": `"email" cannot be empty`,
        "string.base": `"email" must be string`
    }),
    phone: Joi.string().pattern(/^[0-9+() -]+$/).required().messages({
        "any.required": `missing required name field`,
        "string.empty": `"phone" cannot be empty`,
        "string.base": `"phone" must be string`
    }),
})

const putSchema = Joi.object({
    email: Joi.string().email().allow(''),
    phone: Joi.string().pattern(/^[0-9+() -]+$/).allow(''),
    name: Joi.string().allow(''),
}).or('email', 'phone', 'name').required().messages({
    'object.missing': 'missing required name field',
});

module.exports = {
    addSchema,
    putSchema
    }