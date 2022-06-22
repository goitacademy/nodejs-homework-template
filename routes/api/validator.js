const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
  phone: Joi.string().length(14),
});

module.exports = schema;
