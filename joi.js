const Joi = require('@hapi/joi');

const patternContact = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email().max(50),
  phone: Joi.string().min(6).max(20)
})

const patternFavorite = Joi.object({
  favorite: Joi.boolean()
})

module.exports = {
  patternContact,
  patternFavorite
}