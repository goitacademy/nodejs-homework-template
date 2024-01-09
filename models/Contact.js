import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError,addUpdateSettings } from "./hooks.js"; 

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        favorite: {
            type: Boolean,
            default: false,
         },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", addUpdateSettings);

contactSchema.post("findOneAndUpdate", handleSaveError);



export const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required name field`,
    }),
    email: Joi.string().required().messages({
        "any.required": `missing required email field`,
    }),
    phone: Joi.string().required().messages({
        "any.required": `missing required phone field`,
    }),
    favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

export const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
});

const Contact = model("contact", contactSchema);

export default Contact;