const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(9).max(13).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(9).max(13),
});

module.exports = {
  addSchema,
  updateSchema,
};
