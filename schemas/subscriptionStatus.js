const Joi = require("joi");

const contactSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = contactSubscriptionSchema;
