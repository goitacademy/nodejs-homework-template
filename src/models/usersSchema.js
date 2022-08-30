const Joi = require("joi");

const userValidationSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
  subscription: Joi.any().valid("starter", "pro", "business").optional(),
});
const userSubscriptionSchema = Joi.object({
  subscription: Joi.any().valid("starter", "pro", "business").required(),
});

const userVerificationEmailSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required field email" }),
});

module.exports = {
  userValidationSchema,
  userSubscriptionSchema,
  userVerificationEmailSchema,
};
