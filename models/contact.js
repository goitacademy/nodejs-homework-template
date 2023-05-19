const { Schema, model } = require("mongoose");

const contactShema = new Schema({
  // id: { type: String },
  name: { type: String, required: true, match: /^[A-Z]{1-1}[a-zA-Z\s]+$/ },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

const Contact = model("contact", contactShema);

module.exports = Contact;
