const Joi = require('joi')

const namePattern = /^[a-zA-Zа-яА-Я ]+$/
const phonePattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){7,20}(\s*)?$/

const createContactScheme = Joi.object({
  name: Joi.string().pattern(namePattern).min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phonePattern).min(7).max(20).required(),
})

const updateContactScheme = Joi.object({
  name: Joi.string().pattern(namePattern).min(2).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(phonePattern).min(7).max(20).optional(),
})

module.exports = { createContactScheme, updateContactScheme }
