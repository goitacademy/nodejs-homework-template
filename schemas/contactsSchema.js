const Joi = require('joi');

const contactsSchema = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    email: Joi.string().min(4).max(40).required(),
    phone: Joi.string().min(8).max(20).required(),
});

module.exports = {contactsSchema};