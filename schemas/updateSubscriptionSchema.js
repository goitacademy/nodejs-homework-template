const Joi = require("joi");

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = updateSubscriptionSchema;
