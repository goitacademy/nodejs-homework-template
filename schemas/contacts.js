const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
  phone: Joi.string().min(9).required(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  addContactSchema,
  favoriteSchema,
};
