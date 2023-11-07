const Joi = require("joi");

const contactValidation = Joi.object({
  uname: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().required(),
});

module.exports = { contactValidation };
