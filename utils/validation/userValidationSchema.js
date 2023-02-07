const Joi = require("joi");

const authUserValidation = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionValidation = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  authUserValidation,
  updateSubscriptionValidation,
};
