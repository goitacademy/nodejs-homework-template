import Joi from "joi";
import { Schema, model } from "mongoose";
import { addUpdateSettings, handleSaveError } from "./hoooks.js";


export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone:Joi.number()
})

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
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
contactSchema.post("findOneAndUpdate", handleSaveError)
contactSchema.pre("findOneAndUpdate", addUpdateSettings)
export const Contact = model("contact", contactSchema)