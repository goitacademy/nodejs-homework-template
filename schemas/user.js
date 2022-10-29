const Joi = require("joi");

const userSchema = Joi.object().keys({
  password: Joi.string().min(4).required(),
  email: Joi.string()
    .pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    .required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = userSchema;
