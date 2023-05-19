const { Schema, model } = require("mongoose");

const contactShema = new Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const Contact = model("contact", contactShema);

module.exports = Contact;
