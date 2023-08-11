import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleMongooseError } from "../helpers/index.js";

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  }
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError);

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  contactAddSchema,
  updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);
console.log(Contact);

export default {
  Contact,
  schemas,
};