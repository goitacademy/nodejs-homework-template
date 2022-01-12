const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email(),
  phone: Joi.string().min(5).max(10),
});

module.exports = schema;
