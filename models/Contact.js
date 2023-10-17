import  { Schema, model } from 'mongoose';
import { handleSaveError, runValidatorsAtUpdate } from "../hooks/index.js"
import Joi from "joi";
const contactRegexp = {
  name: /[A-Z][a-z]+\s[A-Z][a-z]+/,
  phone: /\(\d{3}\)\s{1}\d{3}\-\d{4}/
}
const contactSchema = new Schema({
    name: {
      type: String,
    required: [true, 'Set name for contact'],
      match: contactRegexp.name,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
       match: contactRegexp.phone,
    },
    favorite: {
      type: Boolean,
      default: false,
  },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  }, {versionKey: false, timestamps: true});

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);


export const contactAddSchema = Joi.object({
  name: Joi.string().required().pattern(contactRegexp.name).messages({
    "any.required": "missing required name field",
    'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern, example: "Example Example"',
  }),
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
    
  }),
  phone: Joi.string().length(14).pattern(contactRegexp.phone).required().messages({
    "any.required": "missing required phone field",
    'string.length': '{{#label}} length must be {{#limit}} characters long, like "(000) 000-0000"',
    'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern, example: "(000) 000-0000"',
  }),
  favorite: Joi.boolean()
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});


export const Contact = model("contact", contactSchema);
