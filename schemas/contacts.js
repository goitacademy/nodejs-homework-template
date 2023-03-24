import { Schema, model } from "mongoose";
import Joi from "joi";
import { mongooseError } from "../helpers/mongooseError.js";
import e from "express";
const contactSchema = new Schema(
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
contactSchema.post("save", mongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

export const validateAdd = (data) => {
  return addSchema.validate(data);
};

export const validateUpdateFavorite = (data) => {
  return updateFavorite.validate(data);
};
export const Contact = model("contact", contactSchema);
