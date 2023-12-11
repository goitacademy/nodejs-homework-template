import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError } from "./hooks.js";

const emailRegExp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegExp,
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
//.post не метод запиту, а вказівка що потрібно виконати дію після

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegExp),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactsUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegExp),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const Contact = model("contact", contactSchema);

export default Contact;
