const Joi = require("joi");

const contactsScheme = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.empty": `"email" cannot be an empty field`,
      "any.required": `"email" is a required field`,
    })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.pattern.base": `Phone number must have 10 digits.`,
      "string.empty": `"phone" cannot be an empty field`,
      "any.required": `"phone" is a required field`,
    }),
});

module.exports = contactsScheme;
