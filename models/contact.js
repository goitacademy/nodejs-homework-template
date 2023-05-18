const { Schema, model } = require("mongoose");

const contactShema = new Schema({
  id: String,
  name: { type: String, required: true },
  email: String,
  phone: String,
});

const Contact = model("contact", contactShema);

module.export = Contact;
