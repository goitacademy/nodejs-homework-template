const Joi = require("joi");

const shcemas = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = { shcemas };
