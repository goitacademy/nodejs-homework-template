const Joi = require('joi');

const contactsSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().min(4).max(20).required(),
    phone: Joi.string().min(8).max(13).required(),

});

module.exports = {contactsSchema};