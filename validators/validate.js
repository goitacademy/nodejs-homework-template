const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})

module.exports = {
  contactSchema,
  favoriteSchema
};