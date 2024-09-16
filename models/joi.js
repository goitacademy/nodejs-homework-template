const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "uk", "ca"] },
    })
    .required(),
  phone: Joi.string().alphanum().required(),
});

const putSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org", "uk", "ca"] },
  }),
  phone: Joi.string().alphanum(),
});

module.exports = { postSchema, putSchema };
