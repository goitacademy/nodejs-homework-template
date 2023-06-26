const Joi = require("joi");

const subscriptionList = ["starter", "pro", "business"];

const userUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .messages({
      "any.only": "{#key} must be 'starter', 'pro' or 'business'",
    }),
}).messages({
  "any.required": "missing required {#key} field",
});

module.exports = userUpdateSubscription;
