const Joi = require('joi');

const createDataValidator = (data) => Joi.object({
  name: Joi.string().min(2).max(255).required().pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/),
  phone: Joi.string().min(4).max(20).required().pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/),
  email : Joi.string().min(4).max(255).required().email(),
}).validate(data);

module.exports = createDataValidator;