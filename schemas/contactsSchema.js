const { Schema, model } = require("mongoose");

const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    unique: [true, "Use another email address"],
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const ContactModel = model("contact", contactsSchema);
module.exports = ContactModel;
