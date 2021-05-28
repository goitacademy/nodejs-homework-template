const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: String, // String is shorthand for {type: String}
    email: String,
    phone: String,
    inArray: {
      type: Boolean,
      default: false,
    },
    user: [{ name: String, email: String, phone: String }],
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);
module.exports = Contact;
