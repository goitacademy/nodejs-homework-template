const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: /[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}/,
    },
    phone: {
      type: String,
      match: [/\(\d{3}\)\s\d{3}-\d{4}/, "Data example (000) 000-0000"],
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
