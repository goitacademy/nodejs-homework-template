import Joi from 'joi';

export const userReqBodySchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(7).required(),
});

export const userEmailReqBodySchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

export const userSubscriptionReqBodySchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});
