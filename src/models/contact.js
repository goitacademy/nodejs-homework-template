const { Schema, model } = require('mongoose');
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
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

// const statusJoiSchema = Joi.object({
//   status: Joi.string().valid('basic', 'sale', 'stock').required(),
// });

const Contact = model('contact', contactsSchema);

module.exports = {
  Contact,
  joiSchema,
  // statusJoiSchema,
};
