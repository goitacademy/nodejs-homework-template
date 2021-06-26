const Joi = require('joi')

const contactSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.string().min(6).required()
})
// contactSchema.validate(data)

module.exports = contactSchema