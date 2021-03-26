const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  phone: {
    type: String,
    minlength: 8,
    maxlength: 20,
  },
  subscription: {
    type: String,
    required: [true, 'Subscription is required'],
    minlength: 3,
    maxlength: 15,
    enum: ['free', 'pro', 'premium'],
    default: 'free',
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    maxlength: 20,
  },
  token: {
    type: String,
    default: '',
  },   
})

const Contact = new model('contacts', contactSchema);

module.exports = Contact;