const Joi = require('joi')

const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
const numberPattern = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
const namePattern = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/

const schemaAddContact = Joi.object({
  name: Joi.string().pattern(namePattern).min(3).max(30).required(),

  number: Joi.string().pattern(numberPattern).required(),

  email: Joi.string().pattern(emailPattern),
})

const schemaUpdayContact = Joi.object({
  name: Joi.string().pattern(namePattern).min(3).max(30),

  number: Joi.string().pattern(numberPattern),

  email: Joi.string().pattern(emailPattern),
})

module.exports = { schemaAddContact, schemaUpdayContact }
