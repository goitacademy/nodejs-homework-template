const Joi = require("joi");

// const passwordPattern = /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/;

const createUserValidasionSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  name: Joi.string(),
  phone: Joi.string(),
});

const loginValidationSchema = Joi.object({
  email: createUserValidasionSchema.extract("email"),
  password: createUserValidasionSchema.extract("password"),
});

module.exports = { createUserValidasionSchema, loginValidationSchema };
// .pattern(passwordPattern)
