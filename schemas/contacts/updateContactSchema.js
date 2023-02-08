const Joi = require("joi");

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(6);
module.exports = updateContactSchema;
