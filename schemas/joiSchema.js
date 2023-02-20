const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  phone: Joi.string().min(8).max(12).required(),
});

module.exports = {
  addSchema,
};
