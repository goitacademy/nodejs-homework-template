const Joi = require("joi");

const contactUpdateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

module.exports = contactUpdateSchema