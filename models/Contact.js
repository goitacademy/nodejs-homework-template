import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      require: true,
    },
    favorite: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", preUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);

export const Contact = model("contact", contactSchema);
