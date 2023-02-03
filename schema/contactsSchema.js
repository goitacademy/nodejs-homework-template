const Joi = require("joi");
const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});
const updateFavoriteContact = Joi.object({
  favorite: Joi.bool().required(),
});
module.exports = { contactsSchema, updateFavoriteContact };
