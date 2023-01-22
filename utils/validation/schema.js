const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(1).max(20).required(),
    email: Joi.string().required(),
    phone: Joi.number().integer().required(),
});

module.exports = {
    schema,
};