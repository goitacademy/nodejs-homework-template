const Joi = require('joi')
const emailSchema = Joi.object({
    email: Joi.string().min(10).max(30).required(),
})

module.exports = emailSchema
