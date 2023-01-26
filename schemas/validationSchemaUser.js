const Joi = require("joi");

const userSchemaSignup = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  userSchemaSignup,
  userSubscriptionSchema,
};
