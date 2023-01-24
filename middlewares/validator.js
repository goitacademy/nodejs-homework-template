const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(8).max(13).required(),
});


exports.validateAddContact = validator(addContactSchema);