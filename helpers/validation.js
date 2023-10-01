const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$|^[0-9]{10}$/)
    .required(),
});

module.exports = {
  contactSchema,
};
