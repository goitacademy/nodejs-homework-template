const Joi = require('joi')

const userSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    password: Joi.string().required().min(7).max(15),

    subscription: Joi.string().optional(),
})

module.exports = {
    userSchema,
}