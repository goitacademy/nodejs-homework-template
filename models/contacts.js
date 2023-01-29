const joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const contactScheme = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

const ContactModel = mongoose.model('contacts', contactScheme);
const joiSchemas = {
  addContactSchema: joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    favorite: joi.boolean(),
  }),

  updateContactSchema: joi
    .object({
      name: joi.string().optional(),
      email: joi.string().optional(),
      phone: joi.string().optional(),
    })
    .or('name', 'email', 'phone'),
};

module.exports = {
  ContactModel,
  joiSchemas,
};
