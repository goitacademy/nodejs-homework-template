const { Schema, model } = require("mongoose");

const contactSchema = Schema({
  name: String,
  description: String,
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
