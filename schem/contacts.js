const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

module.exports = {
  addSchema,
};
