const Joi = require('joi')

exports.contactValidation = (data) => {
    const schema = Joi.object({
        id: Joi.string().min(2).max(255),
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(4).max(255).required().email(),
        phone: Joi.string().min(4).max(255).required().pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    })
    return schema.validate(data)
}