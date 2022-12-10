const Joi = require("joi")

const updateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
}).or('name', 'email', 'phone')

module.exports = updateSchema