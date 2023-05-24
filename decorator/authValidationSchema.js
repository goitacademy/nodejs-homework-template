const Joi = require("joi");

const passwordPattern = /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/;

const createUserValidasionSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .pattern(passwordPattern)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain 8 simbol, at least on letter",
    }),
});

const loginValidationSchema = Joi.object({
  email: createUserValidasionSchema.extract("email"),
  password: createUserValidasionSchema.extract("password"),
});

module.export = { createUserValidasionSchema, loginValidationSchema };
