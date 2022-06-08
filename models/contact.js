const { Schema, model } = require('mongoose');
const Joi = require("joi");

const contactSchema = Schema({
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
});

const schemaCreate = Joi.object({
    
    name: Joi.string().min(2).required(),
    email: Joi.string().required(),
    phone: Joi.string().min(0).required(),
    favorite: Joi.bool(),
});

const schemaPatch = Joi.object({
    favorite: Joi.bool().required(),
});


const Contact = model('contact', contactSchema);

module.exports = {
    Contact, schemaCreate, schemaPatch
}