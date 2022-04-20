const Joi = require("joi");
const JoiForPhone = Joi.extend(require("joi-phone-number"));

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .pattern(/[ a-zA-Z]+/)
    .min(3)
    .max(30)
    .required(),

  phone: JoiForPhone.string().phoneNumber().required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required,
});

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .pattern(/[ a-zA-Z]+/)
    .min(3)
    .max(30),

  phone: JoiForPhone.string().phoneNumber(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

module.exports = { schemaCreateContact, schemaUpdateContact };