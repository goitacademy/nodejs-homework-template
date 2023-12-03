const Joi = require("joi");

const joiUserSchemas = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().min(8).required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter")
    .label("Subscription"),
  token: Joi.string().label("Token"),
  avatarURL: Joi.string(),
});

module.exports = joiUserSchemas;
