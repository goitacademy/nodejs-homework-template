const Joi = require('joi')

const contactFormValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    phone: Joi.string()
        .pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/)
        .message({"string.pattern.base": "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"})
        .required(),
    favorite: Joi.boolean()
})

const updateStatusValidation = Joi.object({
    favorite: Joi.boolean().required()
})

module.exports = {
    contactFormValidation,
    updateStatusValidation
}