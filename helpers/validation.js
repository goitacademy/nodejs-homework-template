const Joi = require("joi");

const schemaPost = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string().required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ru", "ua"] },
    })
    .required(),
});

const schemaPut = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),

  phone: Joi.string().required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ru", "ua"] },
  }),
});

module.exports = { schemaPost, schemaPut };
