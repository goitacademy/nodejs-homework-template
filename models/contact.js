const { Schema, model } = require("mongoose");

const handleMongooseError = require("../helpers/handleMongooseError");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      match: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^(\+?\d{1,3}[- ]?)?\d{10}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
