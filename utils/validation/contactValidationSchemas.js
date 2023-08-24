const Joi = require("joi");

const addContactValidationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .regex(/^[a-zA-Zа-яА-ЯіїєІЇЄ'\s-]+$/)
    .required(),
  email: Joi.string()
    .min(5)
    .max(40)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ua"] },
    })
    .required(),
  phone: Joi.string()
    .min(8)
    .max(30)
    .regex(/^\+[0-9]{1,3}[0-9]{6,14}$/)
    .required(),
});

const schemaJoiValidate = (data) => addContactValidationSchema.validate(data);

module.exports = schemaJoiValidate;
