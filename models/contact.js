const { Schema, model } = require("mongoose");
const { handleSaveError, validateAtUpdate } = require("../models/hooks");
const { phoneNumberRegex } = require("../constants/contacts-constans");
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: phoneNumberRegex,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", handleSaveError);
contactSchema.post("findOneAndUpdate", handleSaveError);
contactSchema.pre("findOneAndUpdate", validateAtUpdate);

const Contact = model("contact", contactSchema);

module.exports = Contact;
