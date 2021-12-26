const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string()
    .length(14)
    // .pattern(/^[0-9]+$/)
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)

    .required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "uk"] },
  }),
});

module.exports = schema;
