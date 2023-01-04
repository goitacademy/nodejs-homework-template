const Joi = require("joi");

const AddContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

module.exports = AddContactSchema;
