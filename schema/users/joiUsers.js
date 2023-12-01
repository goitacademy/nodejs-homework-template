const Joi = require("joi");
const { subscription } = require("../../consts");

const joiUsersSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password is not allowed to be empty",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      "any.required": "Email is required",
      "string.empty": "Email is not allowed to be empty",
    }),
  subscription: Joi.string().valid(...subscription),
});

const joiUsersSchemaSubscr = Joi.object({
  subscription: Joi.string()
    .valid(...subscription)
    .required(),
});

module.exports = { joiUsersSchema, joiUsersSchemaSubscr };
