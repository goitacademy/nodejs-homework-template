const Joi = require('joi');

const postSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().required() // Joi.number().min(1).strict(),
});

const putSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string() // Joi.number().min(1).strict(),
});

module.exports = {
    postSchema,
    putSchema
};