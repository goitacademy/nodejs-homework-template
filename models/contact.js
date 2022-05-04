const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema({
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
    required: [true, 'Set phone number for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const joiProduct = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const joiFavoriteField = Joi.object({ favorite: Joi.boolean().required() });
// const statusJoiSchema = Joi.object({
//   status: Joi.string().valid('basic', 'sale', 'stock').required(),
// });

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  joiProduct,
  joiFavoriteField,
};
