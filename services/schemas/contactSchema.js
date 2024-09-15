const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      minLength: 3,
      maxLength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required!"],
      minLength: 7,
      maxLength: 15,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false },
);

const Contact = mongoose.model("Contact", ContactSchema, "contacts");
module.exports = Contact;
