const { Schema, model } = require("mongoose");

const schemaContacts = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set name for email"],
    },
    phone: {
      type: String,
      required: [true, "Set name for phone "],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Contact", schemaContacts);
