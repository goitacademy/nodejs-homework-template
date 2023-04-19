const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: [true, "Set name for contact"],
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 40,
    require: [true, "Set email for contact"],
  },
  phone: {
    type: String,
    minlength: 12,
    maxlength: 16,
    require: [true, "Set phone for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("contacts", contact);
module.exports = Contact;
