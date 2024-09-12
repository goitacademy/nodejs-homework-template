
import { Schema, model } from "mongoose";

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
});

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "Missing required favorite field" }),
});

const phoneRegex = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 30,
      unique: true,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      min: [6, "Must be at least 6, got {VALUE}"],
      max: [12, "Too long phone number"],
      match: phoneRegex,
      unique: true,
      required: [true, " Phone is required"],
    },

    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);
contactsSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});
contactsSchema.post("findOneAndUpdate", (error, data, next) => {
  error.status = 400;
  next();
});
export const Contact = model("contact", contactsSchema);