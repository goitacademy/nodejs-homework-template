const Joi = require("joi");

const contactShema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),

  phone: Joi.string().min(10).max(15).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ua", "org"] },
    })
    .optional(),
});

module.exports = contactShema;
