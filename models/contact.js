const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  id: String,
  name: { type: String, required: true },
  email: String,
  phone: String,
});

const Contact = model("contact", contactSchema);

module.export = Contact;
