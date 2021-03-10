const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name of your contact"] },
    email: {
      type: String,
      required: [true, "Set e-mail of your contact"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set e-mail of your contact"],
      unique: true,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
