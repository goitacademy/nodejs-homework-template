const Joi = require('joi');

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `"name" must be exist`
    }),
    phone: Joi.string().required(),
    email: Joi.string().required(),
})

module.exports = {
    contactAddSchema,
}