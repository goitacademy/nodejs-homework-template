const Joi = require("joi");

const contactsSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]+$/).min(7).max(15).required(),
});

module.exports = contactsSchema;
