const Joi = require('joi');
const { USER_SUBSCRIPTION_TYPE } = require('../../../helpers/constants');

const validationUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...Object.values(USER_SUBSCRIPTION_TYPE))
    .required()
    .messages({
      'any.required': 'Subscription is required',
      'any.only': `Subscription is one of: ${Object.values(
        USER_SUBSCRIPTION_TYPE,
      )}`,
    }),
});

module.exports = validationUpdateSubscription;
