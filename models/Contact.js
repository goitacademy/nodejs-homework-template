const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const Contact = model("contact", contactSchema);

module.exports = { Contact };
