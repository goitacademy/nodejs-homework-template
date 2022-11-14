const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,

    maxlength: 30,
    required: [true, "Set name for contact"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Set email for contact"],
    unique: true,
  },
  phone: {
    type: String,
    maxlength: 18,
    required: [true, "Set phone for contact"],
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const ContactMod = model("contact", contactSchema);

module.exports = ContactMod;
