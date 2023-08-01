import { Schema, model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";

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
contactSchema.pre("findOneAndUpdate", handleUpdateValidate);
contactSchema.post("findOneAndUpdate", handleSaveError);
// при методі PUT 2спосіб валідація при оновленні зміні, 1сп в контролерах
contactSchema.post("save", handleSaveError);
// / при методі POST щоб відловлювати помилку валідації

const Contact = model("contact", contactSchema);
export default Contact;
