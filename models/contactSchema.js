const joi = require("joi");

const addContactSchema = joi.object({
  name: joi.string().min(3).max(45).required(),
  email: joi.string().email().required(),
  phone: joi
    .string()
    .pattern(/^[0-9]/)
    .required(),
});

const updateContactSchema = joi
  .object({
    name: joi.string().min(3).max(45),
    email: joi.string().email(),
    phone: joi.string().pattern(/^[0-9]{10,15}$/),
  })
  .min(1);

module.exports = { addContactSchema, updateContactSchema };
