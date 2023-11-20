import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name must be exist"],
    },
    email: {
      type: String,
      required: [true, "email must be exist"],
    },
    phone: {
      type: String,
      required: [true, "phone must be exist"],
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" must be exist`,
    "string.base": `"name" must be text`,
  }),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number(),
});

const Contact = model("contact", contactSchema);

export default Contact;
