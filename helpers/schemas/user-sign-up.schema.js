const Joi = require("joi");

const userSignUpSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().min(6).max(30).required(),

  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = {
  userSignUpSchema,
};
