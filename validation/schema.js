const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

module.exports = schema;
