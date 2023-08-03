import { Schema, model } from "mongoose";
import { handleSaveError, validateAtUpdate } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.pre("findOneAndUpdate", validateAtUpdate);
// Якщо валідація по схемі не пройшла, буде виконана ця функція
contactSchema.post("save", handleSaveError);
contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);
export default Contact;
