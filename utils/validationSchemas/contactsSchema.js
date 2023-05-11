const Joi = require("joi");

const contactsSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(10).max(15).required(),
});

module.exports = contactsSchema;
