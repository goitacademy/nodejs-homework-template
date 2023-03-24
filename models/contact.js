const { Schema, model } = require("mongoose");

const contactSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
