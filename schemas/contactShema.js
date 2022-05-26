const Joi = require("joi");

const contactShema = Joi.object({
  name: Joi.string().max(25).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[+0-9-]+$/)
    .min(7)
    .max(17)
    .required(),
});

module.exports = contactShema;
