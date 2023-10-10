import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";
import Joi from "joi";

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

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", runValidateAtUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);

export const addContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"title" must be exsit`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" must be exsit`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" must be exsit`,
  }),
  favorite: Joi.boolean().default(false),
})
  .required()
  .messages({ message: "missing fields" });
export const updateContactSchema = Joi.object()
  .required()
  .messages({ message: "missing fields" });
export const updateFavoriteFieldSchema = Joi.object({
  favorite: Joi.boolean().required(),
})
  .required()
  .messages({ message: "missing field favorite" });

const Contact = model("contact", contactSchema);

export default Contact;
