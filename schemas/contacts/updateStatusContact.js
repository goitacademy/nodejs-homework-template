const Joi = require('joi');

const updateStatusContactSchema = Joi.object({
    favorite: Joi.bool().required(),
});

module.exports = updateStatusContactSchema;
