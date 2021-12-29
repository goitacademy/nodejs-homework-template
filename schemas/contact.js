const Joi = require('joi')

const contactJoiSchema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
})

module.exports = contactJoiSchema

