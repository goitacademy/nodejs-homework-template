const Joi = require('joi');

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string().min(10).max(20),
  favorite: Joi.boolean(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string().min(10).max(20),
  favorite: Joi.boolean(),
});

const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  schemaAddContact,
  schemaUpdateContact,
  schemaUpdateFavorite,
};
