const Joi = require("joi");

const subs = ["starter", "pro", "business"];

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subs)
    .required(),
});

module.exports = subscriptionSchema;
