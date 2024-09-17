const Joi = require('joi');

const updateDataValidator = (data) => Joi.object({
  name: Joi.string().min(2).max(255).pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/),
  phone: Joi.string().min(4).max(20).pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/),
  email : Joi.string().min(4).max(255).email(),
}).validate(data);

module.exports = updateDataValidator;