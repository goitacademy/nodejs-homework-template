const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  phone: Joi.string().required(),
  favorit: false,
});

const favoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing required email field" }),
  password: Joi.string().min(6).max(20).required().messages({
    "any.required": "Missing required password field",
  }),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({ "any.required": "Missing field subscription" }),
});


module.exports = {
  addContactSchema,
  favoriteSchema,
  userSchema,
  subscriptionSchema,
};
