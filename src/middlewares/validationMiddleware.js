const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean(),
});

const schemaFavorite = Joi.object({
  favorite: Joi.boolean(),
});

module.exports = {
  schema,
  schemaFavorite,
};
