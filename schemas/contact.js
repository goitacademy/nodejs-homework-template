const Joi = require("joi");

const contactFull = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});

const contactFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactFull,
  contactFavorite,
};
