const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      minlength: [2, "It is too short!"],
      maxlength: [30, "It is too long!"],
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: { type: String, unique: true },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = mongoose.model("contact", contact);

module.exports = Contact;
