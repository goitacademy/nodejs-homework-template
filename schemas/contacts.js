const Joi = require('joi');

const addContactsSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.base": `"name" must be string`,
        "string.empty": `"name" cannot be empty`,
        "any.required": `missing required "name" field`,
    }),
    email: Joi.string().required().messages({
        "string.base": `"email" must be string`,
        "string.empty": `"email" cannot be empty`,
        "any.required": `missing required "email" field`,
    }),
    phone: Joi.string().required().messages({
        "string.base": `"phone" must be string`,
        "string.empty": `"phone" cannot be empty`,
        "any.required": `missing required "phone" field`,
    }),
});

module.exports = {
    addContactsSchema,
};