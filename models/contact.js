import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";
import Joi from "joi";

const contact = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

export const contactAddScheme = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.required": "missing required name field" }),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export const contactUpdateScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

export const contactUpdateFavoriteScheme = Joi.object({
  favorite: Joi.boolean().required(),
});

contact.post("save", handleMongooseError);

export const Contact = model("contact", contact);
