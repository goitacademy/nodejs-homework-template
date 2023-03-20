const Joi = require("joi");

const userSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
})

module.exports = { userSchema };