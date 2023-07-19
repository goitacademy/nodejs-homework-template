import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../helpers/nandleMongoosError.js";

const ContactSchema = new Schema({
  name: { type: String, required: [true, "Set name for contact"] },
  email: { type: String, required: [true, "Set email for contact"] },
  phone: { type: String, required: [true, "Set phone number for contact"] },
  favorite: { type: Boolean, default: false },
}, {versionKey: false});


ContactSchema.post("save", handleMongooseError);
export const Contact = model("contact", ContactSchema);

export const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
});