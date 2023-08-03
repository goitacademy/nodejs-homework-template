const Joi = require('joi');

const SUBSCRIPTION_TYPES = ['starter', 'pro', 'business'];

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...SUBSCRIPTION_TYPES)
    .required(),
});

module.exports = {
  updateSubscriptionSchema,
};
