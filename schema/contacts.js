const Joi = require("joi");

const dataSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

module.exports = dataSchema;