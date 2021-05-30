const Joi = require("joi");

const { Subscription } = require("../../../helpers/constants");

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

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);

    next();
  } catch (err) {
    next({ status: "400 Bad Request", code: 500, message: err.message });
  }
};

module.exports.validateRegistr = (req, _res, next) => {
  return validate(schemaRegister, req.body, next);
};

module.exports.validateLogin = (req, _res, next) => {
  return validate(schemaLogin, req.body, next);
};

module.exports.validateSubscriptionUpdate = (req, res, next) => {
  return validate(schemaSubscriptionUpdate, req.body, next);
};
