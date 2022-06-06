const Joi = require('joi');
const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
  },
  phone: {
    type: String,
    required: [true, 'Set phone for contact']
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

const schemaCreate = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  favorite: Joi.bool(),
})

const schemaPatch = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model('contact', schema);

module.exports = {
  Contact,
  schemaCreate,
  schemaPatch,
};