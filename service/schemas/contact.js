const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      timestamps: true,
    },
    email: {
      type: String,
      timestamps: true,
    },
    phone: {
      type: String,
      timestamps: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Contact = mongoose.model("contact", contact);

module.exports = Contact;
