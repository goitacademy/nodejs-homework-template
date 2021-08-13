/* eslint-disable semi */
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'This fill is required, please fill it'],
      unique: false,
    },
    email: {
      type: String,
      required: [true, 'This fill is required, please fill it'],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, 'This fill is required, please fill it'],
      unique: true,
      minlength: 10,
      maxlength: 13,
    },
    subscription: {
      type: String,
      default: 'free',
    },
    password: {
      type: String,
      default: 'password',
    },
    token: {
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Contact = model('contact', contactSchema);

module.exports = Contact;
