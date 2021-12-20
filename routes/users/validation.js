const Joi = require("joi");
const { StatusCode, Subscription, ValidLengthName, ValidPassword } = require("../../config/constants");

const BAD_REQUEST = StatusCode.BAD_REQUEST;
const STARTER = Subscription.STARTER;
const PRO = Subscription.PRO;
const BUSINESS = Subscription.BUSINESS;
const MIN_LENGTH_NAME = ValidLengthName.MIN_LENGTH_NAME;
const MAX_LENGTH_NAME = ValidLengthName.MAX_LENGTH_NAME;
const MIN_PASSWORD = ValidPassword.MIN_PASSWORD;

const schemaAddUser = Joi.object({
  name: Joi.string()
    .min(MIN_LENGTH_NAME)
    .max(MAX_LENGTH_NAME)
    .pattern(/[A-Z]\w+/)
    .optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(MIN_PASSWORD).required(),
  subscription: Joi.string()
    .valid(STARTER, PRO, BUSINESS)
    .optional(),
});

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(MIN_PASSWORD).required(),
});

const schemaUpdateSubscriptionUser = Joi.object({
  subscription: Joi.string()
    .valid(STARTER, PRO, BUSINESS)
    .required(),
});

const schemaResendingEmail = Joi.object({
  email: Joi.string().email().required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (err) {
    next({
      status: "err",
      code: BAD_REQUEST,
      message: `Field ${err.message.replace(/"/g, "")}!`,
    });
  }
};

module.exports.validateCreateUser = (req, _res, next) => {
  return validate(schemaAddUser, req.body, next);
};

module.exports.validateSubscriptionUpdate = (req, _res, next) => {
  return validate(schemaUpdateSubscriptionUser, req.body, next);
};

module.exports.validateLogin = (req, _res, next) => {
  return validate(schemaLogin, req.body, next);
};

module.exports.validateResendingEmail = (req, _res, next) => {
  return validate(schemaResendingEmail, req.body, next);
};