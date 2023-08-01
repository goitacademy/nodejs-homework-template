import Joi from 'joi';

const userRegisterSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({ 'any.required': `missing required email field` }),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages({ 'any.required': `missing required password field` }),
});

const userLoginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({ 'any.required': `missing required email field` }),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages({ 'any.required': `missing required password field` }),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

export default {
  userRegisterSchema,
  userLoginSchema,
  userSubscriptionSchema,
};
