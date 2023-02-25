const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).required(),
});

module.exports = schema;
