const Joi = require("joi");

// Схема валідації
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = {
    addSchema,
}