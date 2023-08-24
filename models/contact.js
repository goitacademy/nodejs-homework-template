const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers")

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter name for contact"],
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
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);
contactSchema.post("save", handleMongooseError)

module.exports = Contact;
