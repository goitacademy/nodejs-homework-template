const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  phone: Joi.string().required(),
  favorit: false,
});

const favoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});


module.exports = {
  addContactSchema,
  favoriteSchema,
};
