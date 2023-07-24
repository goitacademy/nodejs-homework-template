import { Schema, model } from "mongoose";
import {
  handleSaveError,
  handleUpdateValidator,
  handleUpdateStatusError,
} from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.pre("findOneAndUpdate", handleUpdateValidator);

contactSchema.post("save", handleSaveError);

contactSchema.post("findOneAndUpdate", handleUpdateStatusError);

const Contact = model("contact", contactSchema);

export default Contact;
