const Joi = require('joi');

const updateSubscription = updatedData => {
  const schema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business'),
  });
  const { error } = schema.validate(updatedData);
  return error;
};

module.exports = updateSubscription;