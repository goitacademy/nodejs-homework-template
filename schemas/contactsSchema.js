const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(2).max(30).alphanum().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\((\d{3})\)[ ](\d{3})[-](\d{4})$/)
    .messages({
      "string.pattern.base": `missing required phone field. Phone number example: (111) 222-3333`,
    })
    .required(),
});

module.exports = contactsSchema;
