const Joi = require('joi');

const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    phone: Joi.string()
        .regex(/^[0-9 ()-]+$/)
        .required(),
});

module.exports = addContactSchema;
