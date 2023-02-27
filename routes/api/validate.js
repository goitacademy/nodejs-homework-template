const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().alphanum().min(5).max(16).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/, { name: "numbers" })
    .required(),
});
const putSchema = Joi.object({
  name: Joi.string().alphanum().min(5).max(16),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().pattern(/^[0-9]+$/, { name: "numbers" }),
});

module.exports = { postSchema, putSchema };
