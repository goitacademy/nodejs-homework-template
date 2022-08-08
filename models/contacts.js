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
}, { versionKey: false, timestamps: true });

const newContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/).required(),
  email: Joi.string().email().required(),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/),
  email: Joi.string().email(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = [
  newContactSchema,
  updateContactSchema,
  updateFavoriteSchema
]

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
