const Joi = require("joi");

const subscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = subscription;
