const Joi = require("joi");

const userJoi = Joi.object({
  email: Joi.string().min(3).required().email(),
  password: Joi.string().min(6).max(15).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const subscriptionJoi = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

module.exports = { userJoi, subscriptionJoi };
