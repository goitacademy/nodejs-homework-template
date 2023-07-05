const { Schema, model } = require("mongoose");

const contact = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 80,
      required: "Contacts name is required",
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 80,
      match: [
        /^[a-zA-Z0-9]+([.\-_]?[a-zA-Z0-9])*@[a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.[a-zA-Z]{2,}$/,
        "Email address must be in proper format e. 'xyz@xyz.xyz'",
      ],
      required: "Email address is required",
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      required: "Contacts phone number is required",
      match: [
        /^(\+|0)?((((\d{2})+[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{3})|((((\+?\d{2})+[ -]?)?\d{3}[ -]?\d{2}[ -]?\d{2})))$/,
        "Only phone numbers in standard polish formats are currently accepted",
      ],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("Contact", contact, "Contacts");
module.exports = Contact;
