const { Schema, model } = require("mongoose");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const contact = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "user" },
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    match: [emailRegex, "Invalid email address!"],
  },
  phone: {
    type: String,
    match: /^[+\d\s-]+$/,
    required: true,
    message:
      "Phone number is not valid. Only digits, " + ", and " - " are allowed.",
  },
  favourite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", contact);

module.exports = Contact;
