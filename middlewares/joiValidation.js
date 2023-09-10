const Joi = require('joi');

const schemaAddContact = Joi.object({
  name: Joi.string()
    .min(2)
    .trim()
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .required(),
  phone: Joi.string()
    .trim()
    .required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .min(2)
    .trim(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim(),
  phone: Joi.string()
    .trim()
}).min(1);

const schemaUpdateFavoriteContact = Joi.object({
  favorite: Joi.boolean()
    .required()
});

const schemaUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .required(),
  password: Joi.string()
    .required(),
  subscription: Joi.string(),
});

const schemaSubscription = Joi.object({
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .required(),
});

const schemaValidationResend = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .required(),
});

module.exports = {
  schemaAddContact,
  schemaUpdateContact,
  schemaUpdateFavoriteContact,
  schemaUser,
  schemaSubscription,
  schemaValidationResend,
};