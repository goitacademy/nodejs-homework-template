// const Joi = require("joi");
const yup = require('yup')

// const contactSchema = Joi.object({
// name: Joi.string().min(1).required(),
// price: Joi.number().min(0.01).required(),
// location: Joi.string().min(1).required(),
// })

const contactSchema = yup.object({
  name: yup
    .string()
    .required('Обязательное поле')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п.",
    ),
  phone: yup
    .string()
    .required('Обязательное поле')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +',
    ),
  email: yup
    .string()
    .required('Обязательное поле')
})

module.exports = contactSchema
