const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definicja schematu kontaktu
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

// Tworzenie modelu Contact na podstawie schematu contactSchema
const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
