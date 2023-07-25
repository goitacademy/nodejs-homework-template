import { Schema, model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";

const contactsSchema = new Schema({
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
}, {versionKey: false, timestamps: true});

contactsSchema.pre('findOneAndUpdate', handleUpdateValidate);
contactsSchema.post('save', handleSaveError);
contactsSchema.post('findOneAndUpdate', handleSaveError);

const Contact = model("contact", contactsSchema);

export default Contact;
