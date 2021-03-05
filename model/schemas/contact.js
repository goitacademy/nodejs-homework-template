const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      // required: [true, 'Set email for contact'],
      unique: true, //для уникальности
    },
    phone: {
      type: String,
      // required: [true, 'Set phone for contact'],
    },
    subscription: {
      type: String,
      default: 'free',
    },
    features: {
      type: Array,
      set: data => (!data ? [] : data),
    },
    password: {
      type: String,
      default: 'password',
    },
    token: {},
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Contact = model('contact', contactSchema);

module.exports = Contact;
