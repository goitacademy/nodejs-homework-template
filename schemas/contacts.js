const Joi = require('joi');

const dataSchema = Joi.object({
    name: Joi.string().max(30).required(),
    email: Joi.string().max(40).required(),
    phone: Joi.string().max(18).required()
})

module.exports = {
    dataSchema,
}