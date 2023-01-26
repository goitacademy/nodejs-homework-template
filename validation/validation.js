const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org"] },
    })
    .required(),
  favorite: Joi.boolean(),
});

const schemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { schema, schemaFavorite };
