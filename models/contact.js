import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";


const phoneRegExp = /^\(\d{3}\) \d{3}-\d{4}$/;


const contactSchema = new Schema({
    name: {
      type: String, 
      required: [true, 'Set name for contact'],
    },
    email: {
       type: String,
       required: true,
    },
    phone: {
       type: String,
       match: phoneRegExp,
       required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
},
   { versionKey: false, timestamps: true }
)

contactSchema.post("save", handleSaveError);

const Contact = model("contact", contactSchema);


contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);


export const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "any.required": "missing required name field"
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "missing required email field",
      "string.email": "Please provide a valid email address (e.g., example@example.com)",
    }),
  phone: Joi.string()
    .pattern(RegExp(phoneRegExp))
    .required()
    .messages({
      "any.required": "missing required phone field",
      "string.pattern.base": "Please provide a valid phone number (e.g., (123) 456-7890)",
    }),
  favorite: Joi.boolean()
}).with("name", ["email", "phone"]);


export const contactUpdateFavoriteSchema = Joi.object({
   favorite: Joi.boolean().optional().allow(null), 
});





export default Contact;