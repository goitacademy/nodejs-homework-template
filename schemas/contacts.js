const Joi = require('joi');
const {
  regExps: { phoneRegExp, nameRegExp, emailRegExp },
} = require('../helpers/');

const favoriteSchema = Joi.object({ favorite: Joi.boolean().required() });
const personDataSchema = Joi.object().keys({
  name: Joi.string().regex(nameRegExp).required(),
  phone: Joi.string().min(10).max(15).regex(phoneRegExp).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  favorite: Joi.boolean().default(false),
});

module.exports = {
  personDataSchema,
  favoriteSchema,
};
