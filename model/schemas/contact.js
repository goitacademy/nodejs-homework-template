const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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

contactSchema.path("name").validate((value) => {
  const regEx = /[A-Z]\w+/;
  return regEx.test(String(value));
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
