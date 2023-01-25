const Joi = require("joi");

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({ "any.required": "missing required subscription type field" }),
});

module.exports = {
  subscriptionSchema,
};
