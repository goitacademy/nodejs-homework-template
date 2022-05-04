const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schemaSignupUser = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я ]+$/)
    .min(2)
    .max(40)
    .required()
    .messages({
      "any.required": "Missing required name field",
      "string.empty": "The name field cannot be empty",
    }),
  email: Joi.string()
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .trim()
    .email()
    .required()
    .messages({
      "any.required": "Missing required name field",
      "string.empty": "The name field cannot be empty",
    }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Missing required name field",
    "string.empty": "The name field cannot be empty",
  }),
  subscription: Joi.string(),
  token: Joi.string(),
  avatarURL: Joi.string(),
  verify: Joi.boolean(),
  verificationToken: Joi.string(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "any.required": "Missing required name field",
    "string.empty": "The name field cannot be empty",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Missing required name field",
    "string.empty": "The name field cannot be empty",
  }),
});

const schemaSubscriptionUser = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemaVerifyUser = Joi.object({
  email: Joi.string().email().required(),
}).messages({
  "any.required": "Missing field {{#label}}",
});

module.exports = {
  schemaSignupUser,
  schemaLoginUser,
  schemaSubscriptionUser,
  schemaVerifyUser,
};
export {};
