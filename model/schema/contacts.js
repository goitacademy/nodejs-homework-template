const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contacts = new Schema(
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
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contacts);
module.exports = Contact;