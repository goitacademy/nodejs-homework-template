import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

// Mongoose Schemes

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
  {
    versionKey: false,
  }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", preUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

// Joi Schemes

export const contactAddScheme = Joi.object({
  name: Joi.string().required().messages({
    "any.required": ` missing required "name" field`,
    "string.base": `"Name" must be text`,
  }),
  email: Joi.string().required().messages({
    "any.required": ` missing required "email" field`,
    "string.base": `"email" must be text`,
  }),
  phone: Joi.string().required().messages({
    "any.required": ` missing required "phone" field`,
    "string.base": `"phone" must be text`,
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export const contactFavoteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
    "boolean.base": `favorite must be boolean`,
  }),
});

export default Contact;
