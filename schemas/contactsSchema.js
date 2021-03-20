const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      default: "free",
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
