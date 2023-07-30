import { Schema, model } from "mongoose";

import { handleSaveError, handleUpdateValidate } from "./hooks.js";

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
});

contactSchema.pre("findOneAndUpdate", handleUpdateValidate);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
