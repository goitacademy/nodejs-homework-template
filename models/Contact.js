const { Schema, model } = require('mongoose');
const { handleValidateError, runUpdateValidators } = require('./hooks');
const { emailValidator } = require('../constants/contact-constants');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      match: [emailValidator, 'Invalid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleValidateError);

contactSchema.pre('findOneAndUpdate', runUpdateValidators);

contactSchema.post('findOneAndUpdate', handleValidateError);

const Contact = model('contact', contactSchema);

module.exports = Contact;
