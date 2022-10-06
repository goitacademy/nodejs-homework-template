const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(7).max(12).required(),
    email: Joi.string().email().required(),
})

module.exports = {
    addSchema,
}