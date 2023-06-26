const joi = require("joi");

const contactSchema = joi.object({
  name: joi.string().min(3),
  email: joi.string().email(),
  phone: joi.string().min(5),
  favorite: joi.boolean(),
});

const userSchema = joi.object({
  email: joi.string().email(),
  password: joi.string(),
});

module.exports = { contactSchema, userSchema };
