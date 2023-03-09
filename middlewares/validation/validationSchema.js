const Joi = require("joi");

const joiSchemaRequired = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(10).max(15).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ua", "org"] },
    })
    .required(),
});

const joiSchemaOptional = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  phone: Joi.string().min(10).max(15).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ua", "org"] },
    })
    .optional(),
});

module.exports = {
  joiSchemaRequired,
  joiSchemaOptional,
};
