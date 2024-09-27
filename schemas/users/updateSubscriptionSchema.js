const Joi = require('joi');

const validSubscriptionValues = ['starter', 'pro', 'business'];
const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid(...validSubscriptionValues)
        .required(),
});

module.exports = updateSubscriptionSchema;
