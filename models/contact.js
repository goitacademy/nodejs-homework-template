import { Schema, model } from "mongoose";
import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";
import Joi from "joi";

const phoneRegExp = /^\(\d{3}\)\s\d{3}-\d{4}$/;

const addSchemaErrorMessages = {
  "string.base": "Field{#label} must be a string.",
  "string.empty": "Field {#label} cannot be empty.",
  "string.email": "Field {#label} must be a valid email address.",
  "string.pattern.base": "Field {#label} must be in the format (000) 000-0000.",
  "object.min": "Missing fields",
  "any.required": "Missing required {#label} field.",
};

const updateFavoriteSchemaErrorMessages = {
  "any.required": "Missing field favorite.",
  "object.min": "Missing field favorite.",
};

const contactSchema = new Schema(
  {
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
      match: phoneRegExp,
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
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);

export const addSchema = Joi.object()
  .min(1)
  .when(Joi.object().min(1), {
    then: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(phoneRegExp).required(),
    }),
  })
  .messages(addSchemaErrorMessages);

export const updateFavoriteSchema = Joi.object()
  .min(1)
  .when(Joi.object().min(1), {
    then: Joi.object({
      favorite: Joi.boolean().required(),
    }),
  })
  .messages(updateFavoriteSchemaErrorMessages);

const Contact = model("contact", contactSchema);

export default Contact;
