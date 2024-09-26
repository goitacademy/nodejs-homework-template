const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
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
    },
});

const Contact = mongoose.model("Contact", contactSchema, "users");

module.exports = Contact;

