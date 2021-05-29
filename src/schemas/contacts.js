const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    min: 2,
    max: 65,
  },
  email: {
    type: String,
    required: [true, "User email is required"],
  },
  phone: {
    type: String,
    min: 10,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
