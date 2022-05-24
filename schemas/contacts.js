const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(30).alphanum().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .pattern(/^\((\d{3})\)[ ](\d{3})[-](\d{4})$/)
    .messages({ "string.pattern.base": `Phone number must be: (992) 914-3792` })
    .required(),
});

module.exports = contactSchema;
