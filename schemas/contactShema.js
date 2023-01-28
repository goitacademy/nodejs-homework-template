const Joi = require("joi");

const addContactSchema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    })

module.exports = {
        addContactSchema,
