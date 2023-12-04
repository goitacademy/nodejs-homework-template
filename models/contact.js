const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    require: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
