const Joi = require('joi')

const createContactSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.string().min(6).required(),
    favorite: Joi.boolean().default(false)
})

module.exports = createContactSchema
