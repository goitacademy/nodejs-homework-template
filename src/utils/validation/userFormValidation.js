const Joi = require('joi')

const userFormValidation = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
})

module.exports = {
    userFormValidation
}