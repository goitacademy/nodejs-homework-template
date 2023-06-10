const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contacts = new Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 15,
      required: [true, "Name is required for new contact"],
    },
    phone: {
      type: Number,
      minlength: 6,
      required: [true, "Number is required for new contact"],
    },
    email: {
      type: String,
      minlength: 6,
      maxlength: 30,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("Contact", contacts);

module.exports = Contact;
