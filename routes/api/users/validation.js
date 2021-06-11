const Joi = require("joi");

const { Subscription, HttpCode } = require("../../../helpers/constants");

const schemaRegister = Joi.object({
  password: Joi.string()
    .min(4)
    .max(30)
    .regex(/[A-Z]\w+/)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),

  subscription: Joi.string(),
});

const schemaLogin = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),
  password: Joi.string().required(),
});

const schemaSubscriptionUpdate = Joi.object({
  subscription: Joi.string()
    .valid(Subscription.PRO, Subscription.STARTER, Subscription.BUSINESS)
    .required(),
});

const schemaVerify = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);

    next();
  } catch (err) {
    next({
      status: "Bad Request",
      code: HttpCode.BAD_REQUEST,
      message: err,
    });
  }
};

module.exports.validateRegistr = (req, _res, next) => {
  return validate(schemaRegister, req.body, next);
};

module.exports.validateLogin = (req, _res, next) => {
  return validate(schemaLogin, req.body, next);
};

module.exports.validateSubscriptionUpdate = (req, _res, next) => {
  return validate(schemaSubscriptionUpdate, req.body, next);
};

module.exports.validateVerify = (req, _res, next) => {
  return validate(schemaVerify, req.body, next);
};
