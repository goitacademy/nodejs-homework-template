import { error } from "console";
// import { date } from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";
import Joi from "joi";

const contactSchema = new Schema(
  {
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
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", preUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"missing required name field"`,
    "string.base": `"name" must be text"`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"missing required email field"`,
    "string.base": `"email" must be text"`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"missing required phone field"`,
    "string.base": `"phone" must be string"`,
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
    "string.empty": `missing field favorite`,
  }),
});

const Contact = model("contact", contactSchema);

export default Contact;
