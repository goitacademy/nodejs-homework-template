const Joi = require("joi");

const newContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  favorite: Joi.string(),
});

const updateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.string(),
});

const favoriteContact = Joi.object({
  favorite: Joi.string().required(),
});

const register = Joi.object({
  email: Joi.string()
    // eslint-disable-next-line no-useless-escape
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
  password: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  newContact,
  updateContact,
  favoriteContact,
  register,
  login,
};
