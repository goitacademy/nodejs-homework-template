const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const { Schema, model } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
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
  },
  { versionKey: false, timestaps: true }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
