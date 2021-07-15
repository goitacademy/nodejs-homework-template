const Joi = require('joi')

const updateContactSchema = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().min(6).email(),
    phone: Joi.string().min(6),
    favorite: Joi.boolean().default(false)
}).or('name', 'email', 'phone')

module.exports = updateContactSchema
