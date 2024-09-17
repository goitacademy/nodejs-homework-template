const Joi = require("joi");

const validateBody = require("../helpers/validateBody");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const validSubscriptionValues = ["starter", "pro", "business"];

const registerValid = validateBody(
  Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
  }),
  "missing required email or password field"
);

const loginValid = validateBody(
  Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
  }),
  "missing required email or password field"
);

const emailValid = validateBody(
  Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
  }),
  "Verification has already been passed"
);

const updateSubscriptionValid = validateBody(
  Joi.object({
    subscription: Joi.string()
      .valid(...validSubscriptionValues)
      .required(),
  }),
  "Invalid subscription data"
);

module.exports = {
  registerValid,
  loginValid,
  updateSubscriptionValid,
  emailValid,
};
