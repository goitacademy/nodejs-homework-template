const Joi = require("joi");

const schema = (body) =>
  Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.string().min(12).max(17).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  }).validate(body);

module.exports = schema;
