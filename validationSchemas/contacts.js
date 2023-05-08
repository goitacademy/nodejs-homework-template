const Joi = require('joi')

const addContactSchema = Joi.object({
  name: Joi.string().pattern(/[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/).required(),
  email: Joi.string().pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
})
const updateContactSchema = Joi.object({
  name: Joi.string().pattern(/[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/).optional(),
  email: Joi.string().pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).optional(),
  phone: Joi.string().optional(),
  favorite:Joi.boolean().optional(),
})
const updateStatusSchema= Joi.object({
  favorite: Joi.boolean().required(),
})
module.exports = { addContactSchema,updateContactSchema,updateStatusSchema }