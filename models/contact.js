const {Schema, model} = require('mongoose');
const Joi = require('joi');

const contactsSchema = Schema({
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

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  favorite: Joi.bool(),
});

const statusJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});
const Contact = model('contact', contactsSchema);

module.exports = {Contact, joiSchema, statusJoiSchema};
