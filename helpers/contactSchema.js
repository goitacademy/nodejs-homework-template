const Joi = require("joi");

const phoneJoi = Joi.extend(require("joi-phone-number"));

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: phoneJoi.string().phoneNumber({ format: "national" }).required(),
});

module.exports = contactSchema;
