const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().required(),
});

const joiSchemaForUpdate = Joi.object({
  name: Joi.string().alphanum().optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.string().optional(),
});

const joiSchemaForFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  joiSchema,
  joiSchemaForUpdate,
  joiSchemaForFavorite,
};
