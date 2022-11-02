
const mongoose = require('mongoose');

const contacts = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'please enter the name for contact'],
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
  });

const Contacts = mongoose.model("contacts", contacts);
module.exports = Contacts;
