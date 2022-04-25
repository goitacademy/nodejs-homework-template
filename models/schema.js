const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactsSchema =  Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
}, {versionKey:false, timestamps:true})

const joiSchema = Joi.object({
  name: Joi.string().required(),
    email: Joi.string().email().required(),
  phone: Joi.string().required().min(10),
     favorite: Joi.bool()
})
const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required()
})
const Contact = model('contact', contactsSchema)
module.exports = {Contact, joiSchema, favoriteJoiSchema} 