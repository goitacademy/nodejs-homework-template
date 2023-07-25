const Joi = require("joi");

const updateSubscription = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .messages({
      messages:
        'Invalid subscription. Please fill a valid "starter", "pro", "business"',
    })
    .messages({ "any.required": "missing required subscription field" }),
});
module.exports = { updateSubscription };
