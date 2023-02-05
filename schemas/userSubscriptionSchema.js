const Joi = require("joi");

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = { userSubscriptionSchema };
