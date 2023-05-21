const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: true,
  },
  phone: {
    type: String,
    match: /^\(\d{3}\) \d{3}-\d{4}$/,
    required: true,
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
