const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(5).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().required(),
});

module.exports = { schema };
