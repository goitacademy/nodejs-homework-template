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
        .regex(/^(\d*|\+*|-*| *|\(*|\)*)*$/)
        .messages({
          "string.pattern.base": `Phone number must have 10 digits.`,
        })
        .required(),
      favorite: Joi.boolean().default(false),
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
      phone: Joi.string().regex(/^(\d*|\+*|-*| *|\(*|\)*)*$/),
      favorite: Joi.bool(),
    })
    .min(1)
    .validate(data);

exports.updateStatusContact = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      favorite: Joi.bool()
        .required()
        .messages({ "any.required": "missing field favorite" }),
    })
    .validate(data);
