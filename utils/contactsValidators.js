const Joi = require("joi");

exports.createContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(12).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.string()
        .regex(/^[0-9]{10}$/)
        .messages({
          "string.pattern.base": `Phone number must have 10 digits.`,
        })
        .required(),
    })
    .validate(data);

exports.updateContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(12),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.number().integer().min(10).max(10),
    })
    .min(1)
    .validate(data);
