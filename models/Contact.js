const { Schema, model } = require("mongoose");

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter contact's name"],
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
const Contact = model("contact", ContactSchema);
module.exports = Contact;
