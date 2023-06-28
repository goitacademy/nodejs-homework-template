const Joi = require("joi");

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).required(),
});

module.exports = {
    schema,
};