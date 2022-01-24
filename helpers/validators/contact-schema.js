const joi = require('joi')

const contactSchema = joi.object({
    name: joi.string().required().min(3).max(40),
    email: joi.string().required().email(),
    phone: joi.string().required()
})

module.exports = contactSchema;
