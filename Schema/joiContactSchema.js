const Joi = require('joi');

const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string().min(9).max(19).required(),
  favorite: Joi.bool().valid('true', 'false'),
});

const joiPutSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().required(),
  favorite: Joi.bool().valid('true', 'false'),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().valid(true, false).required(),
});

module.exports = {
  joiSchema,
  joiPutSchema,
  favoriteJoiSchema,
};
