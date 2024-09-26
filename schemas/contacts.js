const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+\d{1,3}-\d{3}-\d{3}-\d{3}$/)
    .required(),
});

module.exports = addContactSchema;
