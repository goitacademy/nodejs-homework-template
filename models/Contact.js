const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    },
  },
  { versionKey: false, timestamps: true }
);
const Contact = mongoose.model("contact", ContactSchema);
module.exports = Contact;
