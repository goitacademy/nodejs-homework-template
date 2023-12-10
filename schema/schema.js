const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required(),
    phone: Joi.number().integer(6).required(),
});

module.exports = contactSchema;