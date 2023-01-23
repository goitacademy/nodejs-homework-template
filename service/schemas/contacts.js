const { Schema, model } = require("mongoose");
const contact = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    uniq: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const ContactSchema = model("contact", contact);

module.exports = ContactSchema;
