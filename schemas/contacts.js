const Joi = require("joi");

const schemaContacts = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .required(),
});

module.exports = { schemaContacts };
