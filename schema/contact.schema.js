const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contact = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Set email for contact"],
  },
  phone: {
    type: String,
    required: [true, "Set phone for contact"],
  },
});

const Contact = model("contact", contact);
module.exports = Contact;
