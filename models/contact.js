const { boolean } = require("joi");
const { Schema, model } = require("mongoose");

const contactShema = new Schema(
  {
    // id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    favorite: { type: Boolean, default: false },
  }
  // { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactShema);

module.exports = Contact;

// match: /^[A-Z]([a-zA-Z]+\s?)+$/
