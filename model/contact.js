const { Schema, model } = require('mongoose')
const Joi = require('joi')

const nameRegexp = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/
// eslint-disable-next-line
const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/
// eslint-disable-next-line
// const phoneRegexp = /^[0-9]{9}$/

const joiSchema = Joi.object({
  name: Joi.string().min(2).pattern(nameRegexp).required(),
  phone: Joi.string().min(10).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk', 'org', 'ca'] },
    })
    .pattern(emailRegexp)
    .required(),
  favorite: Joi.boolean,
})

const contactSchema = Schema({
  name: {
    type: String,
    minlength: 2,
    match: nameRegexp,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    match: emailRegexp,
  },
  phone: {
    type: String,
    // match: phoneRegexp,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})
const Contact = model('contact', contactSchema)
module.exports = { Contact, joiSchema }
