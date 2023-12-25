import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, addUpdateSettings } from "./hooks.js";

const contactSchema = new Schema(
  {
    avatarContactURL: {
      type: String,
    },
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
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  avatarContactURL: Joi.string(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
  avatarContactURL: Joi.string(),
});

export const contactAvatarSchema = Joi.object({
  avatarContactURL: Joi.string(),
});

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", addUpdateSettings);
contactSchema.post("findOneAndUpdate", handleSaveError);
const Contact = model("contact", contactSchema);

export default Contact;
