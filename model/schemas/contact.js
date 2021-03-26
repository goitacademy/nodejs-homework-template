const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "set name for contact"] },
    email: {
      type: String,
      required: [true, "set email for contact"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "set  phone for contact"],
      unique: true,
    },
    subscription: {
      type: String,
      required: [true, "set subscription for contact"],
    },
    password: {
      type: String,
      required: [true, "set password for contact"],
      min: 6,
      max: 20,
    },
    // как пример буля
    isKnown: {
      type: Boolean,
      default: false,
    },
    // token: {type: String, required: [true, 'set token for contact']},
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
