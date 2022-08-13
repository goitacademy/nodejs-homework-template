const Joi = require("joi");

const contactAddSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
})

module.exports = {
    add: contactAddSchema,
}