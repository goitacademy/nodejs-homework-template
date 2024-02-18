const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const userSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().min(8).required(),
});

exports.validateUser = validator(userSchema);
