const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const contact = new Schema({
  name: {
    type: String,
    maxlength: 50,
    minlenght: 3,
    required: [true, "Set name for contact!"],
    match: [eRegex, "Invalid email address"],
  },
  phone: {
    type: String,
    maxlength: 30,
    minlenght: 3,
    required: [true, "Number is required!"],
    match: /^[+\d\s-]+$/,
  },
  email: {
    type: String,
  },
  favourite: { type: Boolean, required: true, default: false },
});
const Contact = mongoose.model("contact", contact);

module.exports = Contact;
