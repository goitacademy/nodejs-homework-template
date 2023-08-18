const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: { type: String, required: [true, "db: name is required"] },
  email: { type: String, required: [true, "db: email is required"] },
  phone: { type: String, required: [true, "db: phone is required"] },
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
