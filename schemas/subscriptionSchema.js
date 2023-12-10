const Joi = require("joi");
const userSubscriptions = ["starter", "pro", "business"];

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...userSubscriptions)
    .messages({
      "any.required": "missing required subscription field",
    }),
});

module.exports = subscriptionSchema;
