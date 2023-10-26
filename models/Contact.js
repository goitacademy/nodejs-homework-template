import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, runValidators } from "../hooks/hooks.js";

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
  { versionKey: false, timeseries: true }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", runValidators);
contactSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name" field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required "email" field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required "phone" field`,
  }),
});

export const contactfavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing required "favorite" field`,
  }),
});

const Contact = model("contact", contactSchema);
export default Contact;
