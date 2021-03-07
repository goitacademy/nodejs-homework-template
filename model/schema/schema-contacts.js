const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter name"],
    },
    email: {
      type: String,
      required: [true, "Enter email"],
      unique: true,
    },
    phone: {
      type: {},
      required: [true, "Enter phone"],
      unique: true,
    },
    discription: {
      type: String,
    },
    password: {},
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contacts = model("contact", contactSchema);

module.exports = Contacts;
