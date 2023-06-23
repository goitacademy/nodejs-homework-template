const Joi = require("joi");

const addschema = Joi.object({
    name: Joi.string().alphanum().min(3).required().messages({
        "string.base": "Name should be a string",
        "string.min": "Name should have a minimum length of {#limit}",
        "any.required": "Missing required name field",
    }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
            "string.email": "Invalid email format",
            "any.required": "Missing required email field",
        }),

    phone: Joi.string().required().messages({
        "any.required": "Missing required phone field",
    }),
});

module.exports = {
    addschema,
};