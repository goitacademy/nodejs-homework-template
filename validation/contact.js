const yup = require('yup')
const nameRegEx = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/
const phoneRegEx = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/

const addContact = yup.object().shape({
  name: yup.string().min(2).matches(nameRegEx).required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(phoneRegEx).required(),
})

const updateContact = yup
  .object()
  .noUnknown(true)
  .shape({
    name: yup.string().min(2).matches(nameRegEx),
    email: yup.string().email(),
    phone: yup.string().matches(phoneRegEx),
  })

module.exports = { addContact, updateContact }
