const Joi = require("joi");

const contactsSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    phone: Joi.string().required(),
})

module.exports = contactsSchema;
