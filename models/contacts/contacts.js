
import { Schema, model } from 'mongoose'

import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "Missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Missing required phone field",
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
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "Missing required favorite field" }),
});

const contactsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  favorite: { type: Boolean,default:false},
  
}, { versionKey: false, timestamps: true });
contactsSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
}
)
contactsSchema.post("findOneAndUpdate", (error, data, next) => {
  error.status = 400;
  next();
}
)
const Contact = model("contact", contactsSchema);
export default Contact
