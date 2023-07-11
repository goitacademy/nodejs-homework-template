const Joi = require("joi");

const schemaContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^[\d\-()]{6,18}$/)
    .required(),
});

module.exports = {
  schemaContact,
};
