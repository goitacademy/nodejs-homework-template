const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const contactScheme = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactScheme.post("save", handleSaveErrors);

const Contact = model("contacts", contactScheme);

module.exports = Contact;
