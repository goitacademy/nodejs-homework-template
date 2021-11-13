const { Schema, model, SchemaTypes } = require('mongoose');
const Joi = require('joi')

const contactSchema = Schema (  {
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
     owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
})
  
const joySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})


const Contact = model('contacts', contactSchema)

module.exports= {Contact, joySchema}