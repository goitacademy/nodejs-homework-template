const Joi = require('joi');

const updateContactScheme = Joi.object({
    name: Joi.string().min(1),
    email: Joi.string().min(1).email(),
    phone: Joi.string().min(1),
}).min(1);

module.exports = updateContactScheme;