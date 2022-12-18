const Joi = require("joi");

const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { loginUserSchema };
