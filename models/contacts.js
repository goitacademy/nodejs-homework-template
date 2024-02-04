import Joi from "joi";
import { Schema, model } from "mongoose";
import { addUpdateSettings, handleSaveError } from "./hooks.js";


export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.number().required().messages({
    "any.required": `missing required phone field`,
  })
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
            owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    },
    { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);
contactSchema.post("findOneAndUpdate", handleSaveError)
contactSchema.pre("findOneAndUpdate", addUpdateSettings)
export const Contact = model("contact", contactSchema)