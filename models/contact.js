const { Schema, model } = require("mongoose");
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 2,
      maxlength: 10,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      index: true,
      unique: [true, "Phone must be unique"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

Contact.createIndexes();

module.exports = { Contact };
