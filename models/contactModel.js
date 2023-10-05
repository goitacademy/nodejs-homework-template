import { Schema, model } from "mongoose";
import { handleSaveError } from "../helpers/handleSaveError.js";
import Joi from "joi";

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

export const addContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  favorite: Joi.boolean().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(10).max(15).optional(),
  favorite: Joi.boolean().optional(),
}).or("name", "email", "phone");

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const ContactModel = model("contact", contactSchema);
export default ContactModel;
