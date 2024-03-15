import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";
import Joi from "joi";

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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }
});

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", preUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
})
  .min(1)
  .message("Body must have at least one field");

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

export default Contact;
