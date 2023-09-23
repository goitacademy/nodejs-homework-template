import {Schema, model} from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const ContactSchema = new Schema({
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
}, {versionKey: false, timestamps: true});

ContactSchema.post("save", handleSaveError);

ContactSchema.pre("findOneAndUpdate", runValidateAtUpdate);

ContactSchema.post("findOneAndUpdate", handleSaveError);

export const ContactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `"title" must be exist`
    }),
    email: Joi.string().required(),
    favorite: Joi.boolean(),
    phone: Joi.string().required(),
})

export const ContactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const Contact = model("Contact", ContactSchema);

export default Contact;