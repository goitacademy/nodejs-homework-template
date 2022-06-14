const { Schema, model, SchemaTypes } = require('mongoose');
const Joi = require("joi");

const contact = new Schema({
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
    }
});

const schemaCreate = Joi.object({ name: Joi.string().required(), email: Joi.string().email().required(), phone: Joi.string().required() });

const schemaPatch = Joi.object({
    favorite: Joi.bool().required(),
});

const schemaUpdate = Joi.object({ name: Joi.string().required(), email: Joi.string().email().required(), phone: Joi.string().required(), favorite: Joi.bool().required() });


const Contact = model('contact', contact);
  
module.exports = { Contact, schemaCreate, schemaPatch, schemaUpdate};


