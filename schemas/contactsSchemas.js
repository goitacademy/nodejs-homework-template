const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  phone: Joi.number().integer().min(1).max(9999999999).required(),
});

const editContactSchema = Joi.object({
  name: Joi.string().alphanum(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
  phone: Joi.number().integer().min(1).max(9999999999),
});

module.exports = { addContactSchema, editContactSchema };
