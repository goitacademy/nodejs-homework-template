const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  data: { type: Date, default: () => Date.now },
  features: { type: [String], set: (data) => data || [] },
});
const Contact = model("Contact", contactSchema);
module.export = Contact;
