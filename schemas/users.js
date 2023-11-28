const Joi = require("joi");

const userSchema = Joi.object({
  password: Joi.string().required().label("Password"),
  email: Joi.string().email().required().label("Email"),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter")
    .label("Subscription"),
  token: Joi.string()
  .label("Token"),
  avatarURL: Joi.string()
});

module.exports = { userSchema };
