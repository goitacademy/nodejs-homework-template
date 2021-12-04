const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contact = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: String,
    phone: String,
    favorite: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contact);

module.exports = Contact;
