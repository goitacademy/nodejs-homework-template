import Joi from "joi";
import { Schema, model } from "mongoose";
import hooks from "./hooks.js";

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

contactSchema.post("save", hooks.handleSaveError);
contactSchema.post("findOneAndUpdate", hooks.handleSaveError);
contactSchema.pre("findOneAndUpdate", hooks.validateAtUpdate);

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
  favorite: Joi.boolean().messages({
    "string.base": `favorite should be a type of 'text'`,
    "string.empty": `favorite cannot be an empty field`,
    "any.required": `missing required favorite field`,
  }),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "string.base": `favorite should be a type of 'text'`,
    "string.empty": `favorite cannot be an empty field`,
    "any.required": `missing required favorite field`,
  }),
});

export const Contact = model("contact", contactSchema);

export default {
  contactsAddSchema,
  updateFavoriteSchema,
};
