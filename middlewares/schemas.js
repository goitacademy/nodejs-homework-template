const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": "You should provide name",
  }),
  phone: Joi.string()
    .min(10)
    .max(15)
    .required()
    .pattern(
      /\(?([0-9]{3})\) \/?([0-9]{3})-?([0-9]{4})/,
      "For example (000) 000-0000"
    )
    .messages({
      "any.required": "You should provide phone number",
    }),
  email: Joi.string()
    .required()
    .messages({
      "any.required": "You should provide email",
    })
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    }),
});

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).messages({
    "any.required": "You should provide name",
  }),
  phone: Joi.string()
    .max(15)
    .pattern(
      /\(?([0-9]{3})\) \/?([0-9]{3})-?([0-9]{4})/,
      "For example (000) 000-0000"
    )
    .messages({
      "any.required": "You should provide phone number",
    }),
  email: Joi.string()
    .messages({
      "any.required": "You should provide email",
    })
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    }),
});

module.exports = {
  addContactSchema,
  updateContactSchema,
};