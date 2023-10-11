const joi = require("joi");

const contactsSchema = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  phone: joi.number().required(),
});
module.exports = contactsSchema;
