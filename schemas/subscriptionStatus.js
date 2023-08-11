const Joi = require("joi");

const contactSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

module.exports = contactSubscriptionSchema;
