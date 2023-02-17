const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(3).max(30).required(),
});

const contactsUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(15).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: Joi.string().min(3).max(30).optional(),
});

module.exports = {
  contactsSchema,
  contactsUpdateSchema,
};
