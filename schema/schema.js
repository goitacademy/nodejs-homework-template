const Joi = require("joi");

const schemaPOST = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().required(),
});

const schemaPUT = Joi.object({
  name: Joi.string().alphanum().min(3).max(20),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number(),
});

module.exports = {
  schemaPUT,
  schemaPOST,
};
