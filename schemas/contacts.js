const Joi = require('joi')

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),

  phone: Joi.string()
    .pattern(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/)
    .required(),
})

module.exports = {
  addSchema,
}
