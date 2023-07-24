const Joi = require("joi");
const { phoneNumberRegex } = require("../constants/contacts-constans");
const schemaContacts = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().regex(phoneNumberRegex).required(),
  favorite: Joi.boolean(),
});
const schemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { schemaContacts, schemaFavorite };
