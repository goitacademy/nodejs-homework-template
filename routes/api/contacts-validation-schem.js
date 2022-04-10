const Joi = require('joi');

const contactsSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required(),
    phone: Joi.string().pattern(/[0-9]+/).min(3).max(30).required(),
    favorite: Joi.boolean(),
    })

    module.exports = {contactsSchema}