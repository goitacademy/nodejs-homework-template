const Joi = require("joi");

const createUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginUserValidationSchema = Joi.object().keys({
  email: createUserValidationSchema.extract("email"),
  password: createUserValidationSchema.extract("password"),
});

module.exports = {createUserValidationSchema, loginUserValidationSchema}