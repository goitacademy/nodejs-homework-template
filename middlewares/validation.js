const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required().label("name"),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: Joi.string()
    .pattern(/^[0-9-+() ]+$/)
    .optional(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9-+() ]+$/)
    .optional(),
});

module.exports = {
  contactSchema,
  updateContactSchema,
};
