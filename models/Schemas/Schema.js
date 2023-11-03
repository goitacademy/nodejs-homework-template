const { Schema, model } = require("mongoose");

const contact = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "user" },
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    match: [RegExp, "Invalid email address!"],
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
