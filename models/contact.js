const { boolean } = require("joi");
const { Schema, model } = require("mongoose");

const contactShema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  favourite: { type: Boolean, default: false },
});

const Contact = model("contact", contactShema);

module.exports = Contact;
