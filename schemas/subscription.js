const Joi = require("joi");

const subscriptionSchema = Joi.object().keys({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

module.exports = subscriptionSchema;
