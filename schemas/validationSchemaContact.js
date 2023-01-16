const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  phone: Joi.string()
    .length(9)
    .pattern(/^[0-9]+$/)
    .required(),
});

module.exports = {
  contactSchema,
};
