const Joi = require("joi");

const updateSubscriptionValidation = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = updateSubscriptionValidation;