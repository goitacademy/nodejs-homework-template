const Joi = require("joi");

const userValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "pl", "uk"] },
    }),
  phone: Joi.string().required().min(9),
  favorite: Joi.boolean().required(),
});

const favoriteValidationSchema = Joi.object({
  favorite: Joi.boolean().required().default(false),
});

module.exports = { userValidationSchema, favoriteValidationSchema };
