import { Schema, model } from "mongoose";
import { handleServerError, runValidatorsAtUpdate } from "./hooks.js";
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { veresionKey: false, timestamps: true }
);

export const contactsAddSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required()
    .messages({
      "any.required": "missing required 'name' field",
      "string.pattern.base":
        "Name may contain only letters, apostrophe, dash, and spaces. For example, Adrian, Jacob Mercer, Charles de Batz de Castelmore dArtagnan",
    }),
  email: Joi.string().email().required().messages({
    "any.required": "missing required 'email' field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required 'phone' field",
    "string.pattern.base":
      "Phone number must be must be in the format (XXX) XXX-XXXX",
  }),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

contactSchema.post("save", handleServerError);

contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

contactSchema.post("findOneAndUpdate", handleServerError);

const Contact = model("contact", contactSchema);

export default Contact;
