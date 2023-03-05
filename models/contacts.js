const { Schema, model } = require("mongoose");

const handleMongooseError = require("../helpers/handleMongooseError");

const contactsShema = new Schema(
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
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactsShema);

contactsShema.post("save", handleMongooseError);

module.exports = Contact;
