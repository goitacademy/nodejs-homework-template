const Joi = require("joi");

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "mail", "gmail"] },
    })
    .required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  favourite: Joi.boolean(),
});
module.exports = addSchema;
