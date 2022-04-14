const Joi = require('joi');
const { Subscription } = require('../../../helpers/constants');
const subscriptionOptions = Object.values(Subscription);

const validateNewUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(5).max(25).required(),
  subscription: Joi.string()
    .valid(...subscriptionOptions)
    .optional(),
});

const validateLoginUser = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateSubscriptionUpdate = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionOptions)
    .required(),
});

const validate = async (schema, request, next) => {
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    next({
      status: 400,
      message: error.message.replace(/"/g, ''),
    });
  }
};

module.exports = {
  validationNewUser: (req, res, next) => {
    return validate(validateNewUser, req.body, next);
  },
  validationLoginUser: (req, res, next) => {
    return validate(validateLoginUser, req.body, next);
  },
  validationSubscription: (req, res, next) => {
    return validate(validateSubscriptionUpdate, req.body, next);
  },
};