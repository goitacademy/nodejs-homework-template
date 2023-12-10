import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", preUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required field "name"`,
        "string.base": `"name" must be text`,
    }),
    email: Joi.string(),
    phone: Joi.string(), 
    favorite: Joi.boolean(),
});


export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean().messages({
        "string.base": `missing field favorite`,
    }),
});

export const contactFavoriteSchema = Joi.object({
    favorite: Joi.boolean(),
})

const Contact = model("contact", contactSchema); 

export default Contact;