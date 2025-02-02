import mongoose from "mongoose";

// Definiowanie schematu dla kontaktów
const contactSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

// Tworzenie modelu na podstawie schematu
export const ContactModel = mongoose.model(
  "Contact",
  contactSchema,
  "contacts"
);
