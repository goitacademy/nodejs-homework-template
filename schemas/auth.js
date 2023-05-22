const Joi = require("joi");

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatarURL: Joi.string(),
});

module.exports = { createUserSchema };
