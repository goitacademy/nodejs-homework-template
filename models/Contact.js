import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, setUpdate } from "./hooks.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "message": `"missing required name field"`
    }),
    email: Joi.string().required().messages({
        "message": `"missing required email field"`
    }),
    phone: Joi.string().required().messages({
        "message": `"missing required phone field"`
    }),
})

export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
})

const contactSchema = new Schema({  
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
}, { versionKey: false })

contactSchema.post("save", handleSaveError)

contactSchema.pre("findOneAndUpdate", setUpdate)

contactSchema.post("findOneAndUpdate", handleSaveError)

const Contact = model("contact", contactSchema)

export default Contact;