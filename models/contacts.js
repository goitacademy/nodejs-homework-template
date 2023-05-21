const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      match: /^[A-ZA][a-za]+ [A-ZA][a-za]+$/,
    },
    email: {
      type: String,
      match: /^\w+((\.|-|_)?\w+)*@\w+((\.|-|_)?\w+)*(\.\w{2,3})+$/,
    },
    phone: {
      type: String,
      match: /^\(\d{3}\)-\d{3}-\d{4}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
const Contact = model("contact", contactSchema);

module.exports = Contact;
