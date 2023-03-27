const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(5).max(16).required(),
});

const patchSubscriptionShema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = { userSchema, patchSubscriptionShema };