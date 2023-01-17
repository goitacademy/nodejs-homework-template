const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const schema = mongoose.Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
});

  const contactValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().integer().required(),
    favorite: Joi.boolean()
  });

const Contact = mongoose.model('contacts', schema);

module.exports = {
  Contact, 
  contactValidation
};
