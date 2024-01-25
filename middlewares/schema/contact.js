const Joi = require("joi");

const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
};

const userSchema = Joi.object({
  email: Joi.string().pattern(patterns.email).required(),
  password: Joi.string().pattern(patterns.password).required(),
});

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean().default(false),
});

module.exports = {
  userSchema,
  contactSchema,
};
