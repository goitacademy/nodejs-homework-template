const Joi = require("joi");

const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
    .email()
    .required(),
    phone: Joi.string()
    .min(7)
    .max(15)
    .required()
});

module.exports = {
    createContactSchema
};