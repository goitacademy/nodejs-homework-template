const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  phone: Joi.string().required(),
});

module.exports = {
  contactSchema,
};
