import Joi from 'joi';

export const userSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});
