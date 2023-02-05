const Joi = require("joi");

const schemaAuth = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "email should be a type of string",
      "string.email": "not valid email",
      "any.required": "missing required email field",
    }),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,20}/)
    .messages({
      "string.base": "password should be a type of string",
      "string.pattern.base": "not valid password",
      "any.required": "missing required password field",
    }),
});

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "missing field subscription",
    }),
});

module.exports = { schemaAuth, schemaUpdateSubscription };
