const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contacts"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Set name for contacts"],
      unique: true,
    },
    number: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

contactsSchema.virtual("strAge").get(function () {
  return `${this.age} `;
});

const Contact = model("contact", contactsSchema);

module.exports = Contact;
