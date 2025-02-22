import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
import Joi from 'joi';

const contact = new Schema(
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

export const Contact = model("contact", contact);

const addSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

export const schemas = {
  addSchema,
  updateFavoriteSchema,
}