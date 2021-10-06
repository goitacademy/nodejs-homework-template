const Joi = require('joi');

const contactScheme = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(1).email().required(),
    phone: Joi.string().min(1).required(),
});

module.exports = contactScheme;