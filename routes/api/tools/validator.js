const Joi = require("joi");

const schema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .regex(/^\+\d{1,3}\d{6,14}$/)
    .optional(),
});

module.exports = schema;
