/* eslint-disable no-useless-escape */
import { Schema, model } from "mongoose";
// import { handleMongooseError } from "../helpers/handleMongooseError.js";
import joi from "joi";
import { contactValidator } from "../middlewares/bodyValidatorWrapper.js";
import { handleMongooseError } from "../helpers/handleMangooseError.js";

const phoneRegex = /^[0-9]{10}$/; // max length 10 characters
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // example@example.com

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
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

// Joi
export const contactSchemaJoi = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email format must be - example@example.com",
  }),
  phone: joi.string().pattern(phoneRegex).required().messages({
    "string.pattern.base": "Phone format must be - max 10 characters",
  }),
  favorite: joi.boolean().default(false),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
});

export const contactValidate = contactValidator(contactSchemaJoi);
export const favoriteValidate = contactValidator(updateFavoriteSchema);

export const Contact = model("contact", contactSchema);
