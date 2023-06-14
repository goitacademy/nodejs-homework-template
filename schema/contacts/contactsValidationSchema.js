const Joi = require("joi");

const { phoneNumberRegexp } = require("../../constants");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().pattern(phoneNumberRegexp).required(),
  favorite: Joi.boolean(),
});

const editContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().pattern(phoneNumberRegexp),
  favorite: Joi.boolean(),
}).xor("name", "email", "phone", "favorite");

const editFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactSchema,
  editContactSchema,
  editFavoriteContactSchema,
};
