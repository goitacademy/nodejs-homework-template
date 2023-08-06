const Joi = require("joi");

const bodySchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.number().required(),
});

module.exports = {
  bodySchema,
};
