const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regexName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPhone =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const validateName = name => regexName.test(name);
const validateEmail = email => regexEmail.test(email);
const validatePhone = phone => regexPhone.test(phone);

const contact = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    minlength: 1,
    maxlength: 50,
    required: [true, 'Name field is required'],
    validate: [validateName, 'Please fill a valid name'],
    match: [regexName, 'Please fill a valid name'],
  },
  email: {
    index: true,
    type: String,
    trim: true,
    lowercase: true,
    minlength: 5,
    maxlength: 100,
    required: [true, 'Email field is required'],
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [regexEmail, 'Please fill a valid email address'],
    unique: true,
  },
  phone: {
    type: String,
    minlength: 7,
    maxlength: 30,
    required: [true, 'Phone field is required'],
    validate: [validatePhone, 'Please fill a valid phone number'],
    match: [regexPhone, 'Please fill a valid phone number'],
  },
  favorite: {
    type: Boolean,
    required: [false, "Favorite field isn't required"],
    default: false,
  },
});

const Contact = mongoose.model('contact', contact);

module.exports = Contact;
