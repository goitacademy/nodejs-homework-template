const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
});

const contactIdSchema = Joi.object({
  contactId: Joi.string().alphanum().required(),
});
module.exports = {
  contactSchema,
  contactIdSchema,
};