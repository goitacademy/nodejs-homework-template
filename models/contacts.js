const {Schema, model} = require("mongoose")
const Joi = require("joi")

const phoneRegex = /^[0-9]{10}$/;

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    minlength: 2
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    match: phoneRegex
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

const joiSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().required().pattern(phoneRegex),
  phone: Joi.string().required(),
  favorite: Joi.bool
})

const Contact = model("contact", contactSchema)

module.exports = {
  Contact,
  joiSchema
}