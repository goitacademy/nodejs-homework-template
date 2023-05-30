const Joi = require("joi");

const subscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

module.exports = subscriptionSchema;
