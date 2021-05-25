const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      min: 2,
      max: 20,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: mongoose.Mixed,
      required: [true, "Phone is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.path("name").validate((value) => {
  const re = /[A-Z]\w+/;
  return re.test(String(value));
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
