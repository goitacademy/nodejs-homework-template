const Joi = require("joi");

const schemaPostContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.number().integer().required(),
  favorite: Joi.boolean(),
});

const schemaPutContact = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().integer(),
  favorite: Joi.boolean(),
}).min(1);

const schemaFavoriteContact = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  schemaPostContact,
  schemaPutContact,
  schemaFavoriteContact,
};
