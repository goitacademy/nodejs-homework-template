const Joi = require("joi");

const addContactValidation = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(10).max(12),
});

const changeContactValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(10).max(14),
});

const changeContactFavorite = Joi.object({
  favorite: Joi.boolean(),
});

module.exports = {
  addContactValidation,
  changeContactValidation,
  changeContactFavorite,
};
