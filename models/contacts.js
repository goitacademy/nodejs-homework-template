// models\contacts.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      // match: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
      // required:[true, 'Set emaila8l for contact'],
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    // rol: {
    //   type: String,
    //   enum: ["ADMIN", "SELLER", "DELIVER"],
    // },
  }
  // {
  //   versionKey: false,
  //   timestamps: true,
  // }
);

// "Contact" name is Collection, schema is Document
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
