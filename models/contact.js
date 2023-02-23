const { Schema, model } = require('mongoose');
const {
  regExps: { phoneRegExp, emailRegExp, nameRegExp },
} = require('../helpers');
const contactModel = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      default: '',
      match: [nameRegExp, 'Something went wrong. Please check entered name'],
    },
    phone: {
      type: String,
      match: [
        phoneRegExp,
        'Please enter phone in format "+38(123)9991111" or at least with local code',
      ],
    },
    email: {
      type: String,
      match: [emailRegExp, 'Please enter a valid email'],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Contact = model('contact', contactModel);
module.exports = Contact;
