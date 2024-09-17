const Joi = require("joi");

const updateSubscriptionSchema = Joi.object().keys({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = updateSubscriptionSchema;