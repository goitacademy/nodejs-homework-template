const Joi = require("joi");

const validName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const validPhone =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const addSchema = Joi.object({
  name: Joi.string().min(2).max(50).pattern(new RegExp(validName)).required(),
  phone: Joi.string().min(5).pattern(new RegExp(validPhone)).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

module.exports = {
  addSchema,
};
