const Joi = require("joi");
const usersSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

module.exports = { usersSchema };
