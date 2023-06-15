const {Schema, model} = require('mongoose');

const Joi = require('joi');

const {handleMongooseError} = require('../helper');

const contactsSchema = new Schema({
  
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
  
}, {varsionKey: false});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

contactsSchema.post('save', handleMongooseError);

const Contact = model('contact', contactsSchema );

const schemas = {
  addSchema,
}



module.exports = {Contact, schemas};