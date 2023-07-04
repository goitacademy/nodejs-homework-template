const Joi = require("joi");

const contactJoi = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().min(3).required().email(),
  phone: Joi.string()
    .min(6)
    .pattern(/^[+]?[0-9 ()-]*$/)
    .required(),
  favorite: Joi.boolean(),
});

const favoriteJoi = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactJoi, favoriteJoi };
