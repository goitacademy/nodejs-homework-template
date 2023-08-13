const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ca", "ua", "uk"] }
    }),
  phone: Joi.string()
    .min(9)
    .max(15)
    .required()
});

module.exports = schema;