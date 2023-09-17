const Joi = require("joi");

// Схема валідація для покета Joi
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

module.exports = {
  addSchema,
};
