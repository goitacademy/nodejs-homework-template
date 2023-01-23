const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(10),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number(),
});

module.exports = contactsSchema;
