const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: [true, 'Set contact name'],
    },
    email: {
      type: String,
      match: /^.*@.*$/,
      required: [true, 'Set contact email'],
    },
    phone: {
      type: String,
      match: /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/,
      required: [true, 'Set contact phone'],
    },
    subscription: {
      type: String,
      enum: ['free', 'pro', 'premium'],
      required: [true, 'Choose type of subscription'],
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 30,
      required: [true, 'Set contact password'],
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
);

const Contact = model('contact', contactsSchema);

module.exports = Contact;
