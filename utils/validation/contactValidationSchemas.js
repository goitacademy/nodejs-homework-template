const Joi = require("joi");
const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

const addContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).alphanum().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(phonePattern).required(),
  favorite: Joi.boolean(),
});

const updateContactValidationSchema = Joi.object({
  favorite: Joi.boolean().required()
})

module.exports = { addContactValidationSchema, updateContactValidationSchema };
