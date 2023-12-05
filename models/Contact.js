import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", preUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
    "string.base": `name must be a string`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required email field`,
    "string.base": `email must be a string`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
    "string.base": `phone must be a string`,
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
    "string.base": `name must be a string`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required email field`,
    "string.base": `email must be a string`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
    "string.base": `phone must be a string`,
  }),
  favorite: Joi.boolean(),
});

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
    "boolean.base": `"favorite" must be true or false`,
  }),
});

const Contact = model("contact", contactSchema);

export default Contact;
