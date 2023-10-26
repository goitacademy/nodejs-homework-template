import { Schema, model } from "mongoose";
import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";
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
contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" required field`,
  }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "any.required": `"email" required field`,
    }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" required field`,
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).or("name", "email", "phone");

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

export default Contact;
