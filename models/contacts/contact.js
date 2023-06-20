const { Schema, model } = require("mongoose");

const { phoneNumberRegexp } = require("../../constants");

const { contactSchemaError } = require("../../utils");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      match: phoneNumberRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", contactSchemaError);
contactSchema.post("find", contactSchemaError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
