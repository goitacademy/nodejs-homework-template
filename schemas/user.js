const Joi = require("joi");

const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schema = {
  registerSchema,
  subscriptionSchema,
};

module.exports = schema;
