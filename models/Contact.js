import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const contactSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", runValidateAtUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
