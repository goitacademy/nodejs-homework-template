const Joi = require("joi");

const contactCreateValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(11).max(16).required(),
});

const contactUpdateStatusValidationSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactCreateValidationSchema,
  contactUpdateStatusValidationSchema,
};
