const Joi = require('joi');

const contactsSchema = Joi.object()
  .min(1)
  .keys({
    name: Joi.string().min(2).required().messages({
      "any.required": `missing required 'name' field`,
      "string.empty": `'name' cannot be an empty field`,
    }),

    phone: Joi.string()
      .min(6)
      .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
      .required()
      .messages({
        "any.required": `missing required 'phone' field`,
        "string.empty": `'phone' cannot be an empty field`,
        "string.pattern.base": `only format numbers (xxx) xxx-xxxx`,
      }),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
      })
      .required()
      .messages({
        "any.required": `missing required 'email' field`,
        "string.empty": `'email' cannot be an empty field`,
      }),
  });

module.exports = { contactsSchema };
