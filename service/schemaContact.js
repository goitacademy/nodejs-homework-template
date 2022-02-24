const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contact = new Schema({
  name: {
    index: 1,
    type: String,
    minlength: 2,
    maxlength: 40,
    required: [true, 'Поле name обязательное'],
  },
  email: {
    index: 2,
    type: String,
    minlength: 2,
    maxlength: 40,
    required: [true, 'Поле email обязательное'],
    // unique: true,
  },
  phone: {
    index: 3,
    type: String,
    minlength: 7,
    maxlength: 20,
    required: [true, 'Поле phone обязательное'],
  },
  favorite: {
    index: 4,
    type: Boolean,
    required: [false, 'Поле favorite не обязательное'],
    default: false,
  },
});

const Contact = mongoose.model('contact', contact);

module.exports = Contact;
