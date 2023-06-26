const Joi = require("joi");

const subscriptionList = ["starter", "pro", "business"];

const userRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string()
    .valid(...subscriptionList)
    .messages({
      "any.only": "{#key} must be 'starter', 'pro' or 'business'",
    }),
}).messages({
  "any.required": "missing required {#key} field",
});

module.exports = userRegisterSchema;
