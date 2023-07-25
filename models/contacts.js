import Joi from "joi";
import { Schema, model } from "mongoose";
import handleSaveError from "./hooks.js";

const phoneRegexp = /^\d{3}-\d{3}-\d{4}$/;

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
    timestamps: true,
  }
);

contactSchema.post("save", handleSaveError);

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `name should be a type of 'text'`,
    "string.empty": `name cannot be an empty field`,
    "any.required": `missing required name field`,
  }),
  phone: Joi.string()
    .required()
    .messages({
      "string.base": `phone should be a type of 'text'`,
      "string.empty": `phone cannot be an empty field`,
      "any.required": `missing required phone field`,
    })
    .pattern(phoneRegexp),
  email: Joi.string().required().messages({
    "string.base": `email should be a type of 'text'`,
    "string.empty": `email cannot be an empty field`,
    "any.required": `missing required email field`,
  }),
  favourite: Joi.boolean().messages({
    "string.base": `favourite should be a type of 'text'`,
    "string.empty": `favourite cannot be an empty field`,
    "any.required": `missing required favourite field`,
  }),
});

const updateFavouriteSchema = Joi.object({
  favourite: Joi.boolean().required().messages({
    "string.base": `favourite should be a type of 'text'`,
    "string.empty": `favourite cannot be an empty field`,
    "any.required": `missing required favourite field`,
  }),
});

export const Contact = model("contact", contactSchema);

export default {
  contactsAddSchema,
  updateFavouriteSchema,
};
