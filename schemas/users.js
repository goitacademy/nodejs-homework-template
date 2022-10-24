const Joi = require("joi");

const userSchema = Joi.object({
  password: Joi.string().alphanum().min(5).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  subscription: Joi.string().allow("starter", "pro", "business"),
  token: Joi.string(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().pattern(/^(starter|pro|business)$/),
});


module.exports = {
  userSchema,
  subscriptionSchema,
};