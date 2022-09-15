const Joi = require('joi');
const { phoneRegExp, emailRegExp } = require('../constants/regexps');

const ContactSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ tlds: { deny: ['ru', 'by', 'su'] } })
        .pattern(new RegExp(emailRegExp))
        .required(),

    phone: Joi.string()
        .pattern(new RegExp(phoneRegExp))
        .required()
})

module.exports = {
    ContactSchema
}