const Joi = require("joi");

const userSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
})

module.exports = { userSchema };