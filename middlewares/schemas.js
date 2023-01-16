const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string()
  .min(3)
  .required()
  .messages({
    "any.required": "Provide a name",
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
      "any.required": "Provide a phone number",
    }),
  email: Joi.string()
    .email({
        minDomainSegments: 2,
        tlds: { allow: ["com"] },
    })
    .required()
    .messages({
      "any.required": "Provide an email",
    }),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).messages({
    "any.required": "Provide a name",
  }),
  phone: Joi.string()
    .max(15)
    .pattern(
      /\(?([0-9]{3})\) \/?([0-9]{3})-?([0-9]{4})/,
      "For example (000) 000-0000"
    )
    .messages({
      "any.required": "Provide a phone number",
    }),
  email: Joi.string()
    .email({
        minDomainSegments: 2,
        tlds: { allow: ["com"] },
    })
    .messages({
      "any.required": "Provide an email",
    }),
});

module.exports = {
  addContactSchema,
  updateContactSchema,
};