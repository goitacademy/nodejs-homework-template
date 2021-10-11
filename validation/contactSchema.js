const Joi = require("joi");



const joiContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$'))
})


module.exports = joiContactSchema