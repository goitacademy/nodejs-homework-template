const Joi = require("joi");

const contactShemas = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string().min(5).max(30),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

module.exports = contactShemas;