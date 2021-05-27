const Joi = require('joi');
const { HttpCode, Subscription } = require('../../../helpers/constants');

const schemaSignupUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'co', 'uk'] },
    })
    .required(),
  password: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
  subscription: Joi.string()
    .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
    .optional(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'co', 'uk'] },
    })
    .required(),
  password: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
});

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
    .required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (error) {
    next({
      status: HttpCode.BAD_REQUEST,
      message: `Field: ${error.message.replace(/"/g, '')}`,
    });
  }
};

module.exports.validateSignupUser = (req, _res, next) => {
  return validate(schemaSignupUser, req.body, next);
};

module.exports.validateLoginUser = (req, _res, next) => {
  return validate(schemaLoginUser, req.body, next);
};

module.exports.validateUpdateSubscription = (req, _res, next) => {
  return validate(schemaUpdateSubscription, req.body, next);
};
