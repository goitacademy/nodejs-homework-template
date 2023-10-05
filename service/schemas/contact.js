const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contacts = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false, // Set default value to false
  },
});

const Contact = mongoose.model("Contact", contacts);

module.exports = Contact;
